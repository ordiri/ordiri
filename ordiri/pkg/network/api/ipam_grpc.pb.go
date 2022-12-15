// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.6
// source: ipam.proto

package api

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// AddressAllocatorClient is the client API for AddressAllocator service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AddressAllocatorClient interface {
	// Adds a block that can be allocated from
	RegisterBlock(ctx context.Context, in *RegisterBlockRequest, opts ...grpc.CallOption) (*RegisterBlockResponse, error)
	// Request an ip from a block
	Allocate(ctx context.Context, in *AllocateRequest, opts ...grpc.CallOption) (*AllocateResponse, error)
	// Request an ip from a block
	List(ctx context.Context, in *ListRequest, opts ...grpc.CallOption) (*ListResponse, error)
	// Request an ip from a block
	Release(ctx context.Context, in *ReleaseRequest, opts ...grpc.CallOption) (*ReleaseResponse, error)
}

type addressAllocatorClient struct {
	cc grpc.ClientConnInterface
}

func NewAddressAllocatorClient(cc grpc.ClientConnInterface) AddressAllocatorClient {
	return &addressAllocatorClient{cc}
}

func (c *addressAllocatorClient) RegisterBlock(ctx context.Context, in *RegisterBlockRequest, opts ...grpc.CallOption) (*RegisterBlockResponse, error) {
	out := new(RegisterBlockResponse)
	err := c.cc.Invoke(ctx, "/api.AddressAllocator/RegisterBlock", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *addressAllocatorClient) Allocate(ctx context.Context, in *AllocateRequest, opts ...grpc.CallOption) (*AllocateResponse, error) {
	out := new(AllocateResponse)
	err := c.cc.Invoke(ctx, "/api.AddressAllocator/Allocate", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *addressAllocatorClient) List(ctx context.Context, in *ListRequest, opts ...grpc.CallOption) (*ListResponse, error) {
	out := new(ListResponse)
	err := c.cc.Invoke(ctx, "/api.AddressAllocator/List", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *addressAllocatorClient) Release(ctx context.Context, in *ReleaseRequest, opts ...grpc.CallOption) (*ReleaseResponse, error) {
	out := new(ReleaseResponse)
	err := c.cc.Invoke(ctx, "/api.AddressAllocator/Release", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AddressAllocatorServer is the server API for AddressAllocator service.
// All implementations must embed UnimplementedAddressAllocatorServer
// for forward compatibility
type AddressAllocatorServer interface {
	// Adds a block that can be allocated from
	RegisterBlock(context.Context, *RegisterBlockRequest) (*RegisterBlockResponse, error)
	// Request an ip from a block
	Allocate(context.Context, *AllocateRequest) (*AllocateResponse, error)
	// Request an ip from a block
	List(context.Context, *ListRequest) (*ListResponse, error)
	// Request an ip from a block
	Release(context.Context, *ReleaseRequest) (*ReleaseResponse, error)
	mustEmbedUnimplementedAddressAllocatorServer()
}

// UnimplementedAddressAllocatorServer must be embedded to have forward compatible implementations.
type UnimplementedAddressAllocatorServer struct {
}

func (UnimplementedAddressAllocatorServer) RegisterBlock(context.Context, *RegisterBlockRequest) (*RegisterBlockResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterBlock not implemented")
}
func (UnimplementedAddressAllocatorServer) Allocate(context.Context, *AllocateRequest) (*AllocateResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Allocate not implemented")
}
func (UnimplementedAddressAllocatorServer) List(context.Context, *ListRequest) (*ListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method List not implemented")
}
func (UnimplementedAddressAllocatorServer) Release(context.Context, *ReleaseRequest) (*ReleaseResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Release not implemented")
}
func (UnimplementedAddressAllocatorServer) mustEmbedUnimplementedAddressAllocatorServer() {}

// UnsafeAddressAllocatorServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AddressAllocatorServer will
// result in compilation errors.
type UnsafeAddressAllocatorServer interface {
	mustEmbedUnimplementedAddressAllocatorServer()
}

func RegisterAddressAllocatorServer(s grpc.ServiceRegistrar, srv AddressAllocatorServer) {
	s.RegisterService(&AddressAllocator_ServiceDesc, srv)
}

func _AddressAllocator_RegisterBlock_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RegisterBlockRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AddressAllocatorServer).RegisterBlock(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.AddressAllocator/RegisterBlock",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AddressAllocatorServer).RegisterBlock(ctx, req.(*RegisterBlockRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AddressAllocator_Allocate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AllocateRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AddressAllocatorServer).Allocate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.AddressAllocator/Allocate",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AddressAllocatorServer).Allocate(ctx, req.(*AllocateRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AddressAllocator_List_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AddressAllocatorServer).List(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.AddressAllocator/List",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AddressAllocatorServer).List(ctx, req.(*ListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AddressAllocator_Release_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ReleaseRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AddressAllocatorServer).Release(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.AddressAllocator/Release",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AddressAllocatorServer).Release(ctx, req.(*ReleaseRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// AddressAllocator_ServiceDesc is the grpc.ServiceDesc for AddressAllocator service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var AddressAllocator_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "api.AddressAllocator",
	HandlerType: (*AddressAllocatorServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "RegisterBlock",
			Handler:    _AddressAllocator_RegisterBlock_Handler,
		},
		{
			MethodName: "Allocate",
			Handler:    _AddressAllocator_Allocate_Handler,
		},
		{
			MethodName: "List",
			Handler:    _AddressAllocator_List_Handler,
		},
		{
			MethodName: "Release",
			Handler:    _AddressAllocator_Release_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "ipam.proto",
}