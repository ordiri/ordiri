provider "vault" {}

locals {
  default_3y_in_sec   = 94608000
  default_1y_in_sec   = 31536000
  default_1hr_in_sec = 3600
  nodes = {
    poweredge01: {
      ips = ["10.0.1.110", "10.0.1.144"]
    },
    poweredge02: {
      ips = ["10.0.1.113", "10.0.1.108"]
    }
  }
}

