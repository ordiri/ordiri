/* # Vault enterprise only...
#resource "vault_raft_snapshot_agent_config" "local_backups" {
#  name             = "local"
#  interval_seconds = 86400 # 24h
#  retain           = 7
#  path_prefix      = "/opt/vault/persistent/vault/snapshots/"
#  storage_type     = "local"
#  file_prefix = "vault-homelab-"
#
#  # Storage Type Configuration
#  local_max_space = 10000000
#}

vault operator raft snapshot save /opt/vault/persistent/vault/snapshots/vault-homelab-$(date +%F).snap



rsync -uav /opt/vault/ /mnt/media/vault/homelab/$(date +%F) */