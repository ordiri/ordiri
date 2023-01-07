
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

ETCD_URL = https://storage.googleapis.com/etcd
ETCD_VER = v3.5.5

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
generate: generate-openapi generate-controller generate-defaulter generate-client generate-lister generate-informer generate-tsclient generate-proto 

generate-proto: 
	go generate ./...

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
BUILD_TIMESTAMP=$(shell date '+%Y-%m-%dT%H:%M:%S')


.PHONY: linux-ordlet
linux-ordlet: 
	GOOS=linux GOARCH=amd64 go build -ldflags="-X 'github.com/ordiri/ordiri/version.BuildTime=${BUILD_TIMESTAMP}'" -o bin/ordlet-amd64-linux ./cmd/ordlet
	chmod +x bin/ordlet-amd64-linux

bin/controller-manager:
	docker volume create ordiribuildcache
	hash=$$(docker build --platform linux/x86_64 -q --file Dockerfile.controllers .); \
	docker run --platform linux/x86_64 \
		--volume $$PWD:/ordiri \
		--volume ordiribuildcache:/go/ \
		--env=GOCACHE=/go/.gocache \
		--rm \
		--workdir /ordiri \
		$$hash \
			go build -tags quincy -o /ordiri/bin/controller-manager /ordiri/cmd/manager
	

.PHONY: linux-ipam
linux-ipam:
	GOOS=linux GOARCH=amd64 go build -ldflags="-X 'github.com/ordiri/ordiri/version.BuildTime=${BUILD_TIMESTAMP}'" -o bin/ordiri-ipam-amd64-linux ./cmd/ordiri-ipam
	chmod +x bin/ordiri-ipam-amd64-linux

.PHONY: linux-ipxe
linux-ipxe:
	GOOS=linux GOARCH=amd64 go build -ldflags="-X 'github.com/ordiri/ordiri/version.BuildTime=${BUILD_TIMESTAMP}'" -o bin/ordiri-bootserver-amd64-linux ./cmd/bootserver
	chmod +x bin/ordiri-bootserver-amd64-linux

.PHONY: linux-md
linux-md: 
	GOOS=linux GOARCH=amd64 go build -o bin/metadata-amd64-linux ./cmd/vmmetaserver
	chmod +x bin/metadata-amd64-linux

bin/gobgpd-%: 
	curl -sSL -o- https://github.com/osrg/gobgp/releases/download/v$*/gobgp_$*_linux_amd64.tar.gz | tar -C bin -xzf - gobgpd
	mv bin/gobgpd bin/gobgpd-$*
bin/corerad: 
	GOOS=linux GOARCH=amd64 go install github.com/mdlayher/corerad/cmd/corerad@latest
	cp ~/go/bin/linux_amd64/corerad bin/corerad

.PHONY: deploy-ipam
deploy-ipam: linux-ipam
	scp ordiri-ipam.service root@mothership:/etc/systemd/system/.
	ssh root@mothership 'systemctl daemon-reload && systemctl enable ordiri-ipam.service'
	scp bin/ordiri-ipam-amd64-linux root@mothership:~/ordiri-ipam
	ssh root@mothership 'mv ~/ordiri-ipam /usr/local/bin/ordiri-ipam && systemctl daemon-reload'

.PHONY: deploy-controllers
deploy-controllers: bin/controller-manager
	@echo  "WARNING, DEPLOYING CONTROLLER DOES NOT RECOMPILE"
	scp kubeconfig root@mothership:/etc/ordiri.conf
	scp ordiri-controllers.service root@mothership:/etc/systemd/system/.
	ssh root@mothership 'systemctl daemon-reload && systemctl enable ordiri-controllers.service'
	scp bin/controller-manager root@mothership:~/ordiri-controllers
	ssh root@mothership 'mv ~/ordiri-controllers /usr/local/bin/ordiri-controllers && systemctl daemon-reload'

.PHONY: deploy-debian-ordlet
deploy-debian-ordlet: linux-ordlet
	scp kubeconfig root@debian:/etc/ordiri.conf
	scp ordlet.service root@debian:/etc/systemd/system/.
	ssh root@debian 'systemctl daemon-reload && systemctl enable ordlet.service'
	scp bin/ordlet-amd64-linux root@debian:~/ordlet
	ssh root@debian 'mv ~/ordlet /usr/local/bin/ordlet && systemctl daemon-reload'

.PHONY: deploy-debian2-ordlet
deploy-debian2-ordlet: linux-ordlet
	scp kubeconfig root@debian2:/etc/ordiri.conf
	scp ordlet.service root@debian2:/etc/systemd/system/.
	ssh root@debian2 'systemctl daemon-reload && systemctl enable ordlet.service'
	scp bin/ordlet-amd64-linux root@debian2:~/ordlet
	ssh root@debian2 'mv ~/ordlet /usr/local/bin/ordlet && systemctl daemon-reload'

.PHONY: deploy-mothership-ordlet
deploy-mothership-ordlet: linux-ordlet
	scp kubeconfig mothership:/etc/ordiri.conf
	scp ordlet-mothership.service mothership:/etc/systemd/system/ordlet.service
	ssh mothership 'systemctl daemon-reload && systemctl enable ordlet.service'
	scp bin/ordlet-amd64-linux mothership:~/ordlet
	ssh mothership 'mv ~/ordlet /usr/local/bin/ordlet && systemctl daemon-reload'

.PHONY: deploy-debian-md
deploy-debian-md: linux-md
	scp bin/metadata-amd64-linux root@debian:~/ordiri-metadata
	ssh root@debian 'mv ~/ordiri-metadata /usr/local/bin/ordiri-metadata'

.PHONY: deploy-debian-bgp
deploy-debian-bgp: bin/gobgpd-3.7.0
	scp bin/gobgpd-3.7.0 root@debian:~/gobgpd
	ssh root@debian 'mv ~/gobgpd /usr/local/bin/gobgpd'

.PHONY: deploy-debian-corerad
deploy-debian-corerad: bin/corerad
	scp bin/corerad root@debian:~/corerad
	ssh root@debian 'mv ~/corerad /usr/local/bin/corerad'

.PHONY: deploy-debian2-md
deploy-debian2-md: linux-md
	scp bin/metadata-amd64-linux root@debian2:~/ordiri-metadata
	ssh root@debian2 'mv ~/ordiri-metadata /usr/local/bin/ordiri-metadata'

.PHONY: deploy-debian2-bgp
deploy-debian2-bgp: bin/gobgpd-3.7.0
	scp bin/gobgpd-3.7.0 root@debian2:~/gobgpd
	ssh root@debian2 'mv ~/gobgpd /usr/local/bin/gobgpd'

.PHONY: deploy-debian2-corerad
deploy-debian2-corerad: bin/corerad
	scp bin/corerad root@debian2:~/corerad
	ssh root@debian2 'mv ~/corerad /usr/local/bin/corerad'


.PHONY: deploy-mothership-md
deploy-mothership-md: linux-md
	scp bin/metadata-amd64-linux mothership:~/ordiri-metadata
	ssh mothership 'mv ~/ordiri-metadata /usr/local/bin/ordiri-metadata'

.PHONY: run-remote
run-remote: run-debian-remote run-debian2-remote
	@echo "starting"

run-ipam: deploy-ipam
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'systemctl restart ordiri-ipam'
	
run-controllers: deploy-controllers
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'systemctl restart ordiri-controllers'

run-mothership-remote: deploy-mothership-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'systemctl restart ordlet'

log-mothership-remote: deploy-mothership-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh mothership 'journalctl -xefu ordlet'

run-debian-remote: deploy-debian-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian 'systemctl restart ordlet'
run-debian2-remote: deploy-debian2-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian2 'systemctl restart ordlet'
log-debian-remote: deploy-debian-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian 'journalctl -xefu ordlet'
log-debian2-remote: deploy-debian2-ordlet
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@debian2 'journalctl -xefu ordlet'



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
	
.PHONY: build-apiserver
build-apiserver:
	go build -o bin/apiserver ./cmd/apiserver
.PHONY: build-linux-apiserver
build-linux-apiserver:
	GOOS=linux GOARCH=amd64 go build -o bin/apiserver ./cmd/apiserver
	
.PHONY: build-linux-apiserver
deploy-apiserver: build-linux-apiserver
	scp ordiri-apiserver.service root@mothership:/etc/systemd/system/.
	ssh root@mothership 'systemctl daemon-reload && systemctl enable ordiri-apiserver.service'
	scp bin/apiserver root@mothership:~/ordiri-apiserver
	ssh root@mothership 'mv ~/ordiri-apiserver /usr/local/bin/ordiri-apiserver && chmod +x /usr/local/bin/ordiri-apiserver && systemctl daemon-reload'
	# ./bin/apiserver --etcd-servers=http://localhost:2379 --secure-port=9443 --feature-gates=APIPriorityAndFairness=false --standalone-debug-mode
	
.PHONY: deploy-ordiri-etcd
deploy-ordiri-etcd: 
	# the echo starting stops a weird bug in "rm operand not found"

	ssh root@mothership bash -xc 'echo "starting"; rm -f /tmp/etcd-$(ETCD_VER)-linux-amd64.tar.gz; \
	rm -rf /tmp/etcd-download-test; \
	mkdir -p /tmp/etcd-download-test; \
	curl -L https://github.com/etcd-io/etcd/releases/download/$(ETCD_VER)/etcd-$(ETCD_VER)-linux-amd64.tar.gz -o /tmp/etcd-$(ETCD_VER)-linux-amd64.tar.gz; \
	tar xzvf /tmp/etcd-$(ETCD_VER)-linux-amd64.tar.gz -C /tmp/etcd-download-test --strip-components=1; \
	rm -f /tmp/etcd-$(ETCD_VER)-linux-amd64.tar.gz; mv /tmp/etcd-download-test/etcd /usr/local/bin/etcd'

.PHONY: run-ordiri-etcd
run-ordiri-etcd:  deploy-ordiri-etcd
	scp ordiri-etcd.service root@mothership:/etc/systemd/system/.
	ssh root@mothership 'systemctl daemon-reload && systemctl enable ordiri-etcd.service'

	
.PHONY: run-apiserver
run-apiserver: deploy-apiserver run-ordiri-etcd
# modprobe nf_nat_tftp nf_conntrack && 
	ssh root@mothership 'systemctl restart ordiri-apiserver'

.PHONY: run-manager
run-manager: run-controllers

run-vault: 
	VAULT_DEV_LISTEN_ADDRESS="0.0.0.0:8200"  vault server -dev
run-ipxe: linux-ipxe
	scp ordiri-bootserver.service root@mothership:/etc/systemd/system/.
	ssh root@mothership 'systemctl daemon-reload && systemctl enable ordiri-bootserver.service'
	scp bin/ordiri-bootserver-amd64-linux root@mothership:~/ordiri-bootserver
	ssh root@mothership 'mv ~/ordiri-bootserver /usr/local/bin/ordiri-bootserver && chmod +x /usr/local/bin/ordiri-bootserver && systemctl daemon-reload && systemctl restart ordiri-bootserver'
	
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
