#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

rm -fr src/gen && openapi-generator-cli generate \
    --skip-validate-spec  \
    -i ./hack/swagger.json \
    -g typescript-fetch \
    -o src/gen \
    --config client-oapi-gen.yaml