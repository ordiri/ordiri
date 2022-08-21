#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

# While the typescript-fetch is deprecated, it's the only one that supports streaming
# in a browser
kubectl get --raw /openapi/v2 > swagger.json
rm -fr src/gen && openapi-generator-cli generate \
    --skip-validate-spec  \
    -i ./swagger.json \
    -g typescript-fetch \
    -o src/gen \
    --config client-oapi-gen.yaml && npm run build