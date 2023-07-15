package cmd

import (
	"os"
	"path"
	"time"

	"github.com/likexian/selfca"
)

func getCert() (string, string, error) {
	tmp, err := os.MkdirTemp("", "")
	if err != nil {
		return "", "", err
	}
	// config for generating CA certificate
	config := selfca.Certificate{
		IsCA:      true,
		NotBefore: time.Now(),
		NotAfter:  time.Now().Add(time.Duration(365*24) * time.Hour),
		// Hosts:     []string{"localhost:8096"},
	}

	// generating the certificate
	certificate, key, err := selfca.GenerateCertificate(config)
	if err != nil {
		return "", "", err
	}

	// writing the certificate
	caroot := path.Join(tmp, "ca")
	err = selfca.WriteCertificate(caroot, certificate, key)
	if err != nil {
		return "", "", err
	}

	return path.Join(tmp, "ca.crt"), path.Join(tmp, "ca.key"), nil
}
