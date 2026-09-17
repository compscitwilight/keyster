package main

import (
	"crypto/ecdsa"
	"crypto/ed25519"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"

	"golang.org/x/crypto/ssh"
)

// IdentifyCryptographicAlgorithm uses crypto/x509 to identify the
// algorithm used by the contents.
func IdentifyCryptographicAlgorithm(contents []byte) (*KeyAlgo, error) {
	if pubKey, _, _, _, err := ssh.ParseAuthorizedKey(contents); err == nil {
		switch pubKey.Type() {
		case "ssh-rsa":
			return &KeyAlgo{Type: "public", Algo: "RSA"}, nil
		case "ecdsa-sha2-nistp256", "ecdsa-sha2-nistp384", "ecdsa-sha2-nistp521":
			return &KeyAlgo{Type: "public", Algo: "ECDSA"}, nil
		case "ssh-ed25519":
			return &KeyAlgo{Type: "public", Algo: "ED25519"}, nil
		default:
			return &KeyAlgo{Type: "public", Algo: pubKey.Type()}, nil
		}
	}

	if rawPriv, err := ssh.ParseRawPrivateKey(contents); err == nil {
		switch rawPriv.(type) {
		case *rsa.PrivateKey:
			return &KeyAlgo{Type: "private", Algo: "RSA"}, nil
		case *ecdsa.PrivateKey:
			return &KeyAlgo{Type: "private", Algo: "ECDSA"}, nil
		case ed25519.PrivateKey:
			return &KeyAlgo{Type: "private", Algo: "ED25519"}, nil
		default:
			return &KeyAlgo{Type: "private", Algo: "unknown"}, nil
		}
	}

	block, _ := pem.Decode(contents)
	der := contents
	if block != nil {
		der = block.Bytes
	}

	if pub, err := x509.ParsePKIXPublicKey(der); err == nil {
		switch pub.(type) {
		case *rsa.PublicKey:
			return &KeyAlgo{Type: "public", Algo: "RSA"}, nil
		case *ecdsa.PublicKey:
			return &KeyAlgo{Type: "public", Algo: "ECDSA"}, nil
		case ed25519.PublicKey:
			return &KeyAlgo{Type: "public", Algo: "ED25519"}, nil
		}
	}

	if _, err := x509.ParsePKCS1PrivateKey(der); err == nil {
		return &KeyAlgo{Type: "private", Algo: "RSA"}, nil
	}

	if _, err := x509.ParseECPrivateKey(der); err == nil {
		return &KeyAlgo{Type: "private", Algo: "ECDSA"}, nil
	}

	return nil, fmt.Errorf("failed to identify cryptographic key algorithm")
}
