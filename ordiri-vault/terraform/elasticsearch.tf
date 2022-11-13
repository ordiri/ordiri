resource "vault_database_secrets_mount" "db" {
  path = "database"

  elasticsearch {
    name     = "elasticsearch"
    url      = "http://logging.homelab.dmann.xyz:9200"
    username = "vault"
    password = "password"
    insecure = true
    verify_connection = true
    allowed_roles = [ "*" ]
  }
}

resource "vault_database_secret_backend_role" "node-agent" {
  name    = "node-agent"
  backend = vault_database_secrets_mount.db.path
  db_name = vault_database_secrets_mount.db.elasticsearch[0].name
  creation_statements = [
    jsonencode({ 
      elasticsearch_role_definition : {
        indices : [{
          names : ["*"],
          privileges : ["read"]
        }]
      }
    })
  ]
}

resource "vault_database_secret_backend_role" "testrole" {
  name    = "testrole"
  backend = vault_database_secrets_mount.db.path
  db_name = vault_database_secrets_mount.db.elasticsearch[0].name
  creation_statements = [
    jsonencode({ 
      elasticsearch_role_definition : {
        indices : [{
          names : ["*"],
          privileges : ["read"]
        }]
      }
    })
  ]
}
