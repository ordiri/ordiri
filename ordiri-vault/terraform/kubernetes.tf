
    # if ! vault auth list -format json | jq -e '.["kubernetes/"]'; then
    #     vault auth enable kubernetes
    # fi
    # vault write auth/kubernetes/role/k8-autounseal-transit token_policies="k8-autounseal-transit" \
    #     token_ttl=5m token_max_ttl=10m \
    #     bound_service_account_names=vault \
    #     bound_service_account_namespaces=vault \
    #     alias_name_source=serviceaccount_name

    # # TODO Replace once CloudDNS is implemented
    # # echo "10.200.1.214 cluster.homelab.dmann.xyz" >> /etc/hosts
    # # if ! vault auth list -format json | jq -e '.["oidc/"]'; then
    # #     vault auth enable oidc
    # # fi

    # # vault write auth/oidc/config \
    # #      oidc_discovery_url="https://vault.homelab.dmann.xyz:8200/v1/identity/oidc/provider/default/.well-known/openid-configuration" \
    # #      oidc_client_id="$AUTH0_CLIENT_ID" \
    # #      oidc_client_secret="$AUTH0_CLIENT_SECRET" \
    # #      default_role="reader"
# https://vault.homelab.dmann.xyz:8200/v1/identity/oidc/provider/default/.well-known/openid-configuration


# http://localhost:8250/oidc/callback,
# http://localhost:8200/ui/vault/auth/oidc/oidc/callback