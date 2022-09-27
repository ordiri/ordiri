package grpc

import (
	"context"
	"fmt"
	"net"
	"net/netip"
	"strings"

	"github.com/cilium/ipam/service/ipallocator"
	"github.com/dgraph-io/badger/v3"
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

// Allocator allocates IP addresses from registered CIDR blocks
type Allocator struct {
	api.UnimplementedAddressAllocatorServer

	StorePath string

	db *badger.DB
}

func (a *Allocator) Start(ctx context.Context) error {
	// Open the Badger database located in the /tmp/badger directory.
	// It will be created if it doesn't exist.
	db, err := badger.Open(badger.DefaultOptions(a.StorePath))
	if err != nil {
		return err
	}
	a.db = db

	<-ctx.Done()

	return db.Close()
}

const strictMode = true

func (a *Allocator) RegisterBlock(ctx context.Context, req *api.RegisterBlockRequest) (*api.RegisterBlockResponse, error) {
	err := a.db.Update(func(txn *badger.Txn) error {
		builder := netaddr.IPSetBuilder{}
		for _, cidr := range req.Ranges {
			nw, err := netaddr.ParseIPPrefix(cidr.GetCIDR())
			if err != nil {
				return fmt.Errorf("invalid cidr specified - %w", err)
			}
			builder.AddPrefix(nw)
		}
		ipset, err := builder.IPSet()
		if strictMode && err != nil {
			return fmt.Errorf("invalid range supplied - %w", err)
		}

		prefixList := []string{}
		for _, prefix := range ipset.Prefixes() {
			prefixList = append(prefixList, prefix.String())
		}
		ipKey := keyFromParts(req.GetBlockName(), "ranges")

		if err := txn.Set(ipKey, []byte(strings.Join(prefixList, ","))); err != nil {
			return fmt.Errorf("unable to store block - %w", err)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return &api.RegisterBlockResponse{
		BlockName: req.BlockName,
		Ranges:    req.Ranges,
	}, nil
	// return nil, status.Errorf(codes.Unimplemented, "method RegisterBlock not implemented")
}
func keyFromParts(parts ...string) []byte {
	return []byte(strings.Join(parts, "::"))
}

func (a *Allocator) allocateFromBlock(ctx context.Context, blockName, macAddr, preferredIp string, blockSize int) (netip.Prefix, error) {
	return netip.Prefix{}, fmt.Errorf("not implemented")
}

func (a *Allocator) withIpSet(ctx context.Context, blockName string, handler func(ipallocator.Interface) (bool, error)) error {
	return a.db.Update(func(txn *badger.Txn) error {
		ipKey := keyFromParts(blockName, "ranges")
		ranges, err := txn.Get(ipKey)
		if err != nil {
			return fmt.Errorf("unable fetching block %s - %w", blockName, err)
		}
		rangeList, err := ranges.ValueCopy(nil)
		if err != nil {
			return fmt.Errorf("unable to get retrieve ranges for %s - %w", blockName, err)
		}

		for _, prefix := range strings.Split(string(rangeList), ",") {
			addr := netaddr.MustParseIPPrefix(prefix)
			snapshotKey := keyFromParts(blockName, "range", addr.String())

			alloc, err := ipallocator.NewCIDRRange(addr.IPNet())
			if err != nil {
				return err
			}

			snapshot, err := txn.Get(snapshotKey)
			if err != nil {
				if err != badger.ErrKeyNotFound {
					return fmt.Errorf("unable fetching block %s - %w", blockName, err)
				}
			} else {
				snapshot, err := snapshot.ValueCopy(nil)
				if err != nil {
					return fmt.Errorf("unable to get retrieve snapshot for %s - %w", blockName, err)
				}

				alloc.Restore(addr.IPNet(), snapshot)
			}

			handled, err := handler(alloc)
			if err != nil {
				return err
			}

			_, b, err := alloc.Snapshot()
			if err != nil {
				return err
			}

			if err := txn.Set(snapshotKey, b); err != nil {
				return err
			}

			if handled {
				return nil
			}
		}

		return nil
	})

}
func (a *Allocator) List(ctx context.Context, req *api.ListRequest) (*api.ListResponse, error) {
	res := &api.ListResponse{}
	err := a.withIpSet(ctx, req.BlockName, func(alloc ipallocator.Interface) (bool, error) {
		alloc.ForEach(func(i net.IP) {
			res.Allocated = append(res.Allocated, i.String())
		})
		return false, nil
	})

	if err != nil {
		return nil, err
	}

	return res, nil

}
func (a *Allocator) Release(ctx context.Context, req *api.ReleaseRequest) (*api.ReleaseResponse, error) {
	var res *api.ReleaseResponse
	err := a.withIpSet(ctx, req.BlockName, func(alloc ipallocator.Interface) (bool, error) {

		cidr := alloc.CIDR()
		nw, _ := netaddr.FromStdIPNet(&cidr)

		ip, err := netaddr.ParseIP(req.GetAddress())
		if err != nil {
			return false, fmt.Errorf("invalid ip addr - %w", err)
		}

		if nw.Contains(ip) {
			if err := alloc.Release(ip.IPAddr().IP); err != nil {
				return false, err
			}
			res = &api.ReleaseResponse{
				BlockName: req.BlockName,
				Address:   ip.String(),
			}
			return true, nil
		}
		return false, nil
	})

	if err != nil {
		return nil, err
	}

	if res == nil {
		return nil, fmt.Errorf("could not free ip")
	}

	return res, nil
}

func (a *Allocator) Allocate(ctx context.Context, req *api.AllocateRequest) (*api.AllocateResponse, error) {
	var res *api.AllocateResponse
	err := a.withIpSet(ctx, req.BlockName, func(alloc ipallocator.Interface) (bool, error) {
		potential, err := alloc.AllocateNext()
		if err != nil {
			return false, nil
		}
		if newAddr, ok := netaddr.FromStdIP(potential); ok {
			cidr := alloc.CIDR()
			nw, _ := netaddr.FromStdIPNet(&cidr)
			allocated := netaddr.IPPrefixFrom(newAddr, nw.Bits())
			res = &api.AllocateResponse{
				BlockName: req.BlockName,
				Address:   allocated.String(),
			}
			return true, nil
		}
		return false, nil
	})

	if err != nil {
		return nil, err
	}

	if res == nil {
		return nil, fmt.Errorf("no ip left to allocate")
	}

	return res, nil
}
