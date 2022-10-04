package daemon

import (
	"context"

	"github.com/ordiri/ordiri/pkg/network/api"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Server struct {
	*api.UnimplementedNetworkdServer
}

func (s *Server) AddNetwork(ctx context.Context, req *api.AddNetworkRequest) (*api.AddNetworkResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddNetwork not implemented")
}
func (s *Server) DeleteNetwork(ctx context.Context, req *api.DeleteNetworkRequest) (*api.DeleteNetworkResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteNetwork not implemented")
}
func (s *Server) AddSubnet(ctx context.Context, req *api.AddSubnetRequest) (*api.AddSubnetResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddSubnet not implemented")
}
func (s *Server) DeleteSubnet(ctx context.Context, req *api.DeleteSubnetRequest) (*api.DeleteSubnetResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteSubnet not implemented")
}
func (s *Server) AddNetworkInterface(ctx context.Context, req *api.AddNetworkInterfaceRequest) (*api.AddNetworkInterfaceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddNetworkInterface not implemented")
}
func (s *Server) AttachNetworkInterface(ctx context.Context, req *api.AttachNetworkInterfaceRequest) (*api.AttachNetworkInterfaceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AttachNetworkInterface not implemented")
}
func (s *Server) DetachNetworkInterface(ctx context.Context, req *api.DetachNetworkInterfaceRequest) (*api.DetachNetworkInterfaceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DetachNetworkInterface not implemented")
}
func (s *Server) DeleteNetworkInterface(ctx context.Context, req *api.DeleteNetworkInterfaceRequest) (*api.DeleteNetworkInterfaceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteNetworkInterface not implemented")
}
