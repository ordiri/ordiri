# Kubernetes Vault

Uses the internal Transit vault instance to unseal and store root keys

## Overview
The core Vault Server deployment has annotations instructing the [vault-agent-injector](https://www.vaultproject.io/docs/platform/k8s/injector) to inject a configmap containing the transit unseal configuration 