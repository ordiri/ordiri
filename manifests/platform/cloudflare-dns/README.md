# Cloudflare External DNS
Keeps CloudFlare DNS records in sync based on annotated k8s resources

## Supported Resources
- Services

## Overview
Any time a supported resource changes, we extract all the annotations matching `k8s.dmann.xyz/cloudflare-domain-*` and look for an associated `k8s.dmann.xyz/cloudflare-service-*:`annotation that dictates which service hosts the external ip to route to. For any resource which is a `kind: Service` we default to `<.metadata.namespace>/<.metadata.name>`.

For each discovered annotation, we lookup the associated services IP and emit a JSON object describing these details to STDOUT

ArgoWorkflow is configured to treat each line of output from the discovery step as an "item" and will start an individual container who's job is to talk to the CloudFlare API and create a recordset for that individual DNS record.


## Todo
Vault integration for the CFN API Key