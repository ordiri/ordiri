
# Image URL to use all building/pushing image targets
IMG ?= controller:latest
# ENVTEST_K8S_VERSION refers to the version of kubebuilder assets to be downloaded by envtest binary.
ENVTEST_K8S_VERSION = 1.23

# Get the currently used golang install path (in GOPATH/bin, unless GOBIN is set)
ifeq (,$(shell go env GOBIN))
GOBIN=$(shell go env GOPATH)/bin
else
GOBIN=$(shell go env GOBIN)
endif

CONTROLLER_GEN = $(shell pwd)/bin/controller-gen
LISTER_GEN = $(shell pwd)/bin/lister-gen
OPENAPI_GEN = $(shell pwd)/bin/openapi-gen
DEFAULTER_GEN = $(shell pwd)/bin/defaulter-gen
INFORMER_GEN = $(shell pwd)/bin/informer-gen
CLIENT_GEN = $(shell pwd)/bin/client-gen
KUSTOMIZE = $(shell pwd)/bin/kustomize
ENVTEST = $(shell pwd)/bin/setup-envtest
PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))

# Setting SHELL to bash allows bash commands to be executed by recipes.
# This is a requirement for 'setup-envtest.sh' in the test target.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

PACKAGE_NAME = github.com/ordiri/ordiri

.PHONY: all
all: build

##@ General

# The help target prints out all targets with their descriptions organized
# beneath their categories. The categories are represented by '##@' and the
# target descriptions by '##'. The awk commands is responsible for reading the
# entire set of makefiles included in this invocation, looking for lines of the
# file as xyz: ## something, and then pretty-format the target and help. Then,
# if there's a line with ##@ something, that gets pretty-printed as a category.
# More info on the usage of ANSI control characters for terminal formatting:
# https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters
# More info on the awk command:
# http://linuxcommand.org/lc3_adv_awk.php

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development


.PHONY: manifests
manifests: controller-gen generate ## Generate WebhookConfiguration, ClusterRole and CustomResourceDefinition objects.
	$(CONTROLLER_GEN) rbac:roleName=manager-role crd webhook paths="./pkg/apis/..." output:crd:artifacts:config=config/crd/bases

.PHONY: generate
generate: generate-controller generate-openapi generate-tsclient generate-client generate-lister generate-informer generate-defaulter

clientset_name = versioned
gendir = pkg/generated
INPUT_DIRS = "$(PACKAGE_NAME)/pkg/apis/core/v1alpha1,$(PACKAGE_NAME)/pkg/apis/network/v1alpha1,$(PACKAGE_NAME)/pkg/apis/compute/v1alpha1,$(PACKAGE_NAME)/pkg/apis/storage/v1alpha1,$(PACKAGE_NAME)/pkg/apis/authorization/v1alpha1"
CLIENT_INPUTS = "pkg/apis/core/v1alpha1,pkg/apis/network/v1alpha1,pkg/apis/compute/v1alpha1,pkg/apis/storage/v1alpha1,pkg/apis/authorization/v1alpha1"
generate-controller: $(CONTROLLER_GEN)
	$(CONTROLLER_GEN) object:headerFile="hack/boilerplate.go.txt" paths="./pkg/apis/..."
generate-tsclient: $(CONTROLLER_GEN)
	cd ../ordiri-client-typescript && ./client.sh

generate-client: $(CLIENT_GEN)
	$(CLIENT_GEN)  --clientset-name $(clientset_name) --input-base $(PACKAGE_NAME) --input $(CLIENT_INPUTS) --trim-path-prefix $(PACKAGE_NAME) --output-package $(PACKAGE_NAME)/$(gendir)/clientset --go-header-file ./hack/boilerplate.go.txt

generate-lister: $(LISTER_GEN)
	$(LISTER_GEN)  --input-dirs $(INPUT_DIRS) --trim-path-prefix $(PACKAGE_NAME) --output-package $(PACKAGE_NAME)/$(gendir)/listers --go-header-file ./hack/boilerplate.go.txt

generate-informer: $(INFORMER_GEN)
	$(INFORMER_GEN)  --input-dirs $(INPUT_DIRS) --versioned-clientset-package $(PACKAGE_NAME)/$(gendir)/clientset/$(clientset_name) --listers-package $(PACKAGE_NAME)/$(gendir)/listers --output-base=. --trim-path-prefix $(PACKAGE_NAME) --output-package $(PACKAGE_NAME)/$(gendir)/informers --go-header-file ./hack/boilerplate.go.txt

generate-defaulter: $(DEFAULTER_GEN)
	$(DEFAULTER_GEN)  --input-dirs $(INPUT_DIRS) --output-base=. --trim-path-prefix $(PACKAGE_NAME) --output-package $(PACKAGE_NAME)/$(gendir)/defaulters --go-header-file ./hack/boilerplate.go.txt
	
generate-openapi: $(OPENAPI_GEN)
	$(OPENAPI_GEN) -v10 --input-dirs k8s.io/apimachinery/pkg/api/resource,k8s.io/api/autoscaling/v1,k8s.io/api/core/v1,k8s.io/apimachinery/pkg/apis/meta/v1,k8s.io/apimachinery/pkg/runtime,k8s.io/apimachinery/pkg/version,$(PACKAGE_NAME)/pkg/apis/... --output-package $(gendir)/openapi -O zz_generated.openapi --go-header-file ./hack/boilerplate.go.txt

.PHONY: fmt
fmt: ## Run go fmt against code.
	go fmt ./...

.PHONY: vet
vet: ## Run go vet against code.
	go vet ./...

.PHONY: test
test: manifests generate fmt vet $(ENVTEST) ## Run tests.
	KUBEBUILDER_ASSETS="$(shell $(ENVTEST) use $(ENVTEST_K8S_VERSION) -p path)" go test ./... -coverprofile cover.out

##@ Build

.PHONY: build
build: generate fmt vet ## Build manager binary.
	go build -o bin/manager main.go

.PHONY: run
run: manifests generate fmt vet ## Run a controller from your host.
	go run ./main.go

.PHONY: docker-build
docker-build: test ## Build docker image with the manager.
	docker build -t ${IMG} .

.PHONY: docker-push
docker-push: ## Push docker image with the manager.
	docker push ${IMG}

##@ Deployment

ifndef ignore-not-found
  ignore-not-found = false
endif

.PHONY: linux-ordlet
linux-ordlet: 
	GOOS=linux GOARCH=amd64 go build -o bin/ordlet-amd64-linux ./cmd/ordlet
	chmod +x bin/ordlet-amd64-linux
.PHONY: linux-md
linux-md: 
	GOOS=linux GOARCH=amd64 go build -o bin/metadata-amd64-linux ./cmd/vmmetaserver
	chmod +x bin/metadata-amd64-linux

.PHONY: deploy-debian-ordlet deploy-mothership-ordlet
deploy-debian-ordlet: linux-ordlet
	scp kubeconfig root@debian:/etc/ordiri.conf
	scp ordlet.service root@debian:/etc/systemd/system/ordlet.service
	ssh root@debian 'systemctl daemon-reload && systemctl enable ordlet.service'
	scp bin/ordlet-amd64-linux root@debian:~/ordlet
	ssh root@debian 'mv ~/ordlet /usr/local/bin/ordlet && systemctl daemon-reload'

deploy-mothership-ordlet: linux-ordlet
	scp kubeconfig mothership:/etc/ordiri.conf
	scp ordlet.service mothership:/etc/systemd/system/ordlet.service
	ssh mothership 'systemctl daemon-reload && systemctl enable ordlet.service'
	scp bin/ordlet-amd64-linux mothership:~/ordlet
	ssh mothership 'mv ~/ordlet /usr/local/bin/ordlet && systemctl daemon-reload'

deploy-debian-md: linux-md
	scp bin/metadata-amd64-linux root@debian:~/ordiri-metadata
	ssh root@debian 'mv ~/ordiri-metadata /usr/local/bin/ordiri-metadata'

deploy-mothership-md: linux-md
	scp bin/metadata-amd64-linux mothership:~/ordiri-metadata
	ssh mothership 'mv ~/ordiri-metadata /usr/local/bin/ordiri-metadata'

.PHONY: run-remote
run-remote: run-debian-remote run-mothership-remote
	@echo "starting"

run-mothership-remote: deploy-mothership-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'systemctl restart ordlet'
log-mothership-remote: deploy-mothership-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'journalctl -xefu ordlet'

run-debian-remote: deploy-debian-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian 'systemctl restart ordlet'
log-debian-remote: deploy-debian-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian 'journalctl -xefu ordlet'



.PHONY: start-all
start-all: 
	make etcd &
	sleep 5
	make run-apiserver &
	sleep 2
	make run-manager &
	make run-remote &


# .PHONY: start stop



.PHONY: binaries
binaries:
	apiserver-boot  build executables

.PHONY: etcd
etcd: 
	killall etcd || true
	etcd
	
.PHONY: run-apiserver
run-apiserver: 
	killall apiserver || true
	go build -o bin/apiserver ./cmd/apiserver
	./bin/apiserver --etcd-servers=http://localhost:2379 --secure-port=9443 --feature-gates=APIPriorityAndFairness=false --standalone-debug-mode

.PHONY: run-manager
run-manager: 
	killall controller-manager || true
	go build -o ./bin/controller-manager ./cmd/manager
	VAULT_ADDR='http://127.0.0.1:8200' ./bin/controller-manager --kubeconfig=kubeconfig

run-vault: 
	VAULT_DEV_LISTEN_ADDRESS="0.0.0.0:8200"  vault server -dev
run-ipxe: 
	killall bootserver || true
	go build -o bin/bootserver ./cmd/bootserver
	KUBECONFIG=kubeconfig ./bin/bootserver server
run-vmmetaserver: 
	killall vmmetaserver || true
	go build -o bin/vmmetaserver ./cmd/vmmetaserver
	KUBECONFIG=kubeconfig ./bin/vmmetaserver server
run-dashboard: 
	cd ../ordiri-dashboard && npm start

.PHONY: run-local
run-local: binaries
	make etcd &
	sleep 5
	make run-apiserver  &
	sleep 5
	make run-manager &

.PHONY: install
install: manifests $(KUSTOMIZE) ## Install CRDs into the K8s cluster specified in ~/.kube/config.
	$(KUSTOMIZE) build config/crd | kubectl apply -f -

.PHONY: uninstall
uninstall: manifests $(KUSTOMIZE) ## Uninstall CRDs from the K8s cluster specified in ~/.kube/config. Call with ignore-not-found=true to ignore resource not found errors during deletion.
	$(KUSTOMIZE) build config/crd | kubectl delete --ignore-not-found=$(ignore-not-found) -f -

.PHONY: deploy
deploy: manifests $(KUSTOMIZE) ## Deploy controller to the K8s cluster specified in ~/.kube/config.
	cd config/manager && $(KUSTOMIZE) edit set image controller=${IMG}
	$(KUSTOMIZE) build config/default | kubectl apply -f -

.PHONY: undeploy
undeploy: $(KUSTOMIZE) ## Undeploy controller from the K8s cluster specified in ~/.kube/config. Call with ignore-not-found=true to ignore resource not found errors during deletion.
	$(KUSTOMIZE) build config/default | kubectl delete --ignore-not-found=$(ignore-not-found) -f -


.PHONY: $(CONTROLLER_GEN)
$(CONTROLLER_GEN): ## Download controller-gen locally if necessary.
	$(call go-get-tool,$(CONTROLLER_GEN),sigs.k8s.io/controller-tools/cmd/controller-gen@latest)


.PHONY: $(LISTER_GEN)
$(LISTER_GEN): ## Download lister-gen locally if necessary.
	$(call go-get-tool,$(LISTER_GEN),k8s.io/code-generator/cmd/lister-gen@latest)


.PHONY: $(OPENAPI_GEN)
$(OPENAPI_GEN):
 	# Brew install openapi-generator
	$(call go-get-tool,$(OPENAPI_GEN),k8s.io/kube-openapi/cmd/openapi-gen@latest)


.PHONY: $(DEFAULTER_GEN)
$(DEFAULTER_GEN):
	$(call go-get-tool,$(DEFAULTER_GEN),k8s.io/code-generator/cmd/defaulter-gen@latest)


.PHONY: $(INFORMER_GEN)
$(INFORMER_GEN):
	$(call go-get-tool,$(INFORMER_GEN),k8s.io/code-generator/cmd/informer-gen@latest)


.PHONY: $(CLIENT_GEN)
$(CLIENT_GEN):
	$(call go-get-tool,$(CLIENT_GEN),k8s.io/code-generator/cmd/client-gen@latest)


.PHONY: $(KUSTOMIZE)
$(KUSTOMIZE): ## Download kustomize locally if necessary.
	$(call go-get-tool,$(KUSTOMIZE),sigs.k8s.io/kustomize/kustomize/v3@v3.8.7)


.PHONY: $(ENVTEST)
$(ENVTEST): ## Download envtest-setup locally if necessary.
	$(call go-get-tool,$(ENVTEST),sigs.k8s.io/controller-runtime/tools/setup-envtest@latest)

# go-get-tool will 'go get' any package $2 and install it to $1.

define go-get-tool
@[ -f $(1) ] || { \
set -e ;\
TMP_DIR=$$(mktemp -d) ;\
cd $$TMP_DIR ;\
go mod init tmp ;\
echo "Downloading $(2)" ;\
GOBIN=$(PROJECT_DIR)/bin go install $(2) ;\
rm -rf $$TMP_DIR ;\
}
endef
