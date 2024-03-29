// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.6
// source: ipam.proto

package api

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type AllocatableRange struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	CIDR string `protobuf:"bytes,1,opt,name=CIDR,proto3" json:"CIDR,omitempty"`
}

func (x *AllocatableRange) Reset() {
	*x = AllocatableRange{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AllocatableRange) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AllocatableRange) ProtoMessage() {}

func (x *AllocatableRange) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AllocatableRange.ProtoReflect.Descriptor instead.
func (*AllocatableRange) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{0}
}

func (x *AllocatableRange) GetCIDR() string {
	if x != nil {
		return x.CIDR
	}
	return ""
}

type RegisterBlockRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string              `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Ranges    []*AllocatableRange `protobuf:"bytes,2,rep,name=Ranges,proto3" json:"Ranges,omitempty"`
}

func (x *RegisterBlockRequest) Reset() {
	*x = RegisterBlockRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterBlockRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterBlockRequest) ProtoMessage() {}

func (x *RegisterBlockRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterBlockRequest.ProtoReflect.Descriptor instead.
func (*RegisterBlockRequest) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{1}
}

func (x *RegisterBlockRequest) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *RegisterBlockRequest) GetRanges() []*AllocatableRange {
	if x != nil {
		return x.Ranges
	}
	return nil
}

type RegisterBlockResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string              `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Ranges    []*AllocatableRange `protobuf:"bytes,2,rep,name=Ranges,proto3" json:"Ranges,omitempty"`
}

func (x *RegisterBlockResponse) Reset() {
	*x = RegisterBlockResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterBlockResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterBlockResponse) ProtoMessage() {}

func (x *RegisterBlockResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterBlockResponse.ProtoReflect.Descriptor instead.
func (*RegisterBlockResponse) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{2}
}

func (x *RegisterBlockResponse) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *RegisterBlockResponse) GetRanges() []*AllocatableRange {
	if x != nil {
		return x.Ranges
	}
	return nil
}

type AllocateRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
}

func (x *AllocateRequest) Reset() {
	*x = AllocateRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AllocateRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AllocateRequest) ProtoMessage() {}

func (x *AllocateRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AllocateRequest.ProtoReflect.Descriptor instead.
func (*AllocateRequest) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{3}
}

func (x *AllocateRequest) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

type AllocateResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Address   string `protobuf:"bytes,2,opt,name=Address,proto3" json:"Address,omitempty"`
}

func (x *AllocateResponse) Reset() {
	*x = AllocateResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AllocateResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AllocateResponse) ProtoMessage() {}

func (x *AllocateResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AllocateResponse.ProtoReflect.Descriptor instead.
func (*AllocateResponse) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{4}
}

func (x *AllocateResponse) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *AllocateResponse) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

type ReleaseRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Address   string `protobuf:"bytes,2,opt,name=Address,proto3" json:"Address,omitempty"`
}

func (x *ReleaseRequest) Reset() {
	*x = ReleaseRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ReleaseRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ReleaseRequest) ProtoMessage() {}

func (x *ReleaseRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ReleaseRequest.ProtoReflect.Descriptor instead.
func (*ReleaseRequest) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{5}
}

func (x *ReleaseRequest) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *ReleaseRequest) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

type ReleaseResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Address   string `protobuf:"bytes,2,opt,name=Address,proto3" json:"Address,omitempty"`
}

func (x *ReleaseResponse) Reset() {
	*x = ReleaseResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ReleaseResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ReleaseResponse) ProtoMessage() {}

func (x *ReleaseResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ReleaseResponse.ProtoReflect.Descriptor instead.
func (*ReleaseResponse) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{6}
}

func (x *ReleaseResponse) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *ReleaseResponse) GetAddress() string {
	if x != nil {
		return x.Address
	}
	return ""
}

type ListRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
}

func (x *ListRequest) Reset() {
	*x = ListRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListRequest) ProtoMessage() {}

func (x *ListRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListRequest.ProtoReflect.Descriptor instead.
func (*ListRequest) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{7}
}

func (x *ListRequest) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

type ListResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BlockName string   `protobuf:"bytes,1,opt,name=BlockName,proto3" json:"BlockName,omitempty"`
	Allocated []string `protobuf:"bytes,2,rep,name=Allocated,proto3" json:"Allocated,omitempty"`
}

func (x *ListResponse) Reset() {
	*x = ListResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipam_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListResponse) ProtoMessage() {}

func (x *ListResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ipam_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListResponse.ProtoReflect.Descriptor instead.
func (*ListResponse) Descriptor() ([]byte, []int) {
	return file_ipam_proto_rawDescGZIP(), []int{8}
}

func (x *ListResponse) GetBlockName() string {
	if x != nil {
		return x.BlockName
	}
	return ""
}

func (x *ListResponse) GetAllocated() []string {
	if x != nil {
		return x.Allocated
	}
	return nil
}

var File_ipam_proto protoreflect.FileDescriptor

var file_ipam_proto_rawDesc = []byte{
	0x0a, 0x0a, 0x69, 0x70, 0x61, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03, 0x61, 0x70,
	0x69, 0x22, 0x26, 0x0a, 0x10, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x61, 0x62, 0x6c, 0x65,
	0x52, 0x61, 0x6e, 0x67, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x43, 0x49, 0x44, 0x52, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x04, 0x43, 0x49, 0x44, 0x52, 0x22, 0x63, 0x0a, 0x14, 0x52, 0x65, 0x67,
	0x69, 0x73, 0x74, 0x65, 0x72, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x12,
	0x2d, 0x0a, 0x06, 0x52, 0x61, 0x6e, 0x67, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x61, 0x62, 0x6c,
	0x65, 0x52, 0x61, 0x6e, 0x67, 0x65, 0x52, 0x06, 0x52, 0x61, 0x6e, 0x67, 0x65, 0x73, 0x22, 0x64,
	0x0a, 0x15, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b,
	0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63,
	0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x2d, 0x0a, 0x06, 0x52, 0x61, 0x6e, 0x67, 0x65, 0x73, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x41, 0x6c, 0x6c, 0x6f,
	0x63, 0x61, 0x74, 0x61, 0x62, 0x6c, 0x65, 0x52, 0x61, 0x6e, 0x67, 0x65, 0x52, 0x06, 0x52, 0x61,
	0x6e, 0x67, 0x65, 0x73, 0x22, 0x2f, 0x0a, 0x0f, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b,
	0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63,
	0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x22, 0x4a, 0x0a, 0x10, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74,
	0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f,
	0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c,
	0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x41, 0x64, 0x64, 0x72, 0x65,
	0x73, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73,
	0x73, 0x22, 0x48, 0x0a, 0x0e, 0x52, 0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d,
	0x65, 0x12, 0x18, 0x0a, 0x07, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x07, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x22, 0x49, 0x0a, 0x0f, 0x52,
	0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c,
	0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07,
	0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x41,
	0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x22, 0x2b, 0x0a, 0x0b, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e,
	0x61, 0x6d, 0x65, 0x22, 0x4a, 0x0a, 0x0c, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x4e, 0x61, 0x6d,
	0x65, 0x12, 0x1c, 0x0a, 0x09, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65, 0x64, 0x18, 0x02,
	0x20, 0x03, 0x28, 0x09, 0x52, 0x09, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65, 0x64, 0x32,
	0xfe, 0x01, 0x0a, 0x10, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x41, 0x6c, 0x6c, 0x6f, 0x63,
	0x61, 0x74, 0x6f, 0x72, 0x12, 0x48, 0x0a, 0x0d, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72,
	0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x12, 0x19, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x52, 0x65, 0x67, 0x69,
	0x73, 0x74, 0x65, 0x72, 0x42, 0x6c, 0x6f, 0x63, 0x6b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x1a, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x42,
	0x6c, 0x6f, 0x63, 0x6b, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x39,
	0x0a, 0x08, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65, 0x12, 0x14, 0x2e, 0x61, 0x70, 0x69,
	0x2e, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x41, 0x6c, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x65, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x2d, 0x0a, 0x04, 0x4c, 0x69, 0x73,
	0x74, 0x12, 0x10, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x11, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x36, 0x0a, 0x07, 0x52, 0x65, 0x6c, 0x65,
	0x61, 0x73, 0x65, 0x12, 0x13, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x52, 0x65, 0x6c, 0x65, 0x61, 0x73,
	0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x14, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x52,
	0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00,
	0x42, 0x2a, 0x5a, 0x28, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6f,
	0x72, 0x64, 0x69, 0x72, 0x69, 0x2f, 0x6f, 0x72, 0x64, 0x69, 0x72, 0x69, 0x2f, 0x70, 0x6b, 0x67,
	0x2f, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x2f, 0x61, 0x70, 0x69, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_ipam_proto_rawDescOnce sync.Once
	file_ipam_proto_rawDescData = file_ipam_proto_rawDesc
)

func file_ipam_proto_rawDescGZIP() []byte {
	file_ipam_proto_rawDescOnce.Do(func() {
		file_ipam_proto_rawDescData = protoimpl.X.CompressGZIP(file_ipam_proto_rawDescData)
	})
	return file_ipam_proto_rawDescData
}

var file_ipam_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_ipam_proto_goTypes = []interface{}{
	(*AllocatableRange)(nil),      // 0: api.AllocatableRange
	(*RegisterBlockRequest)(nil),  // 1: api.RegisterBlockRequest
	(*RegisterBlockResponse)(nil), // 2: api.RegisterBlockResponse
	(*AllocateRequest)(nil),       // 3: api.AllocateRequest
	(*AllocateResponse)(nil),      // 4: api.AllocateResponse
	(*ReleaseRequest)(nil),        // 5: api.ReleaseRequest
	(*ReleaseResponse)(nil),       // 6: api.ReleaseResponse
	(*ListRequest)(nil),           // 7: api.ListRequest
	(*ListResponse)(nil),          // 8: api.ListResponse
}
var file_ipam_proto_depIdxs = []int32{
	0, // 0: api.RegisterBlockRequest.Ranges:type_name -> api.AllocatableRange
	0, // 1: api.RegisterBlockResponse.Ranges:type_name -> api.AllocatableRange
	1, // 2: api.AddressAllocator.RegisterBlock:input_type -> api.RegisterBlockRequest
	3, // 3: api.AddressAllocator.Allocate:input_type -> api.AllocateRequest
	7, // 4: api.AddressAllocator.List:input_type -> api.ListRequest
	5, // 5: api.AddressAllocator.Release:input_type -> api.ReleaseRequest
	2, // 6: api.AddressAllocator.RegisterBlock:output_type -> api.RegisterBlockResponse
	4, // 7: api.AddressAllocator.Allocate:output_type -> api.AllocateResponse
	8, // 8: api.AddressAllocator.List:output_type -> api.ListResponse
	6, // 9: api.AddressAllocator.Release:output_type -> api.ReleaseResponse
	6, // [6:10] is the sub-list for method output_type
	2, // [2:6] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_ipam_proto_init() }
func file_ipam_proto_init() {
	if File_ipam_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_ipam_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AllocatableRange); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterBlockRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterBlockResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AllocateRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AllocateResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ReleaseRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ReleaseResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipam_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_ipam_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_ipam_proto_goTypes,
		DependencyIndexes: file_ipam_proto_depIdxs,
		MessageInfos:      file_ipam_proto_msgTypes,
	}.Build()
	File_ipam_proto = out.File
	file_ipam_proto_rawDesc = nil
	file_ipam_proto_goTypes = nil
	file_ipam_proto_depIdxs = nil
}
