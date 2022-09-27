package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	"github.com/ordiri/ordiri/pkg/network/api"
	ipamgrpc "github.com/ordiri/ordiri/pkg/network/ipam/grpc"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()

	allocator := &ipamgrpc.Allocator{
		StorePath: "/tmp/ipam.db",
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	api.RegisterAddressAllocatorServer(s, allocator)
	log.Printf("server listening at %v", lis.Addr())
	go func() {
		if err := allocator.Start(ctx); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
		s.GracefulStop()

	}()
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
