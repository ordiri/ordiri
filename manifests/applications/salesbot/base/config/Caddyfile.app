:443 {
  root * /opt/salesbot
  tls /opt/salesbot-tls/tls.crt /opt/salesbot-tls/tls.key

  # Compress responses according to Accept-Encoding headers
  encode gzip zstd
  
  # Serve everything else from the file system
  reverse_proxy localhost:8080

  header Access-Control-Allow-Methods "POST, GET, OPTIONS"
  @options {
    method OPTIONS
  }
  respond @options 204

	header Access-Control-Allow-Origin "app.voxora.ai"
	header Access-Control-Allow-Headers "content-type, x-requested-with"
	header Vary Origin
}

:80 {
  respond /live 200
  respond /ready 200
}

salesbot.dmann.dev {  
  redir https://app.voxora.ai{uri} permanent
}

salesbot.dmann.xyz {  
  redir https://app.voxora.ai{uri} permanent
}