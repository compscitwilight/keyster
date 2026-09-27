package main

import (
	"bufio"
	"bytes"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/crypto/ssh"
)

var KNOWN_HOSTS_PATH = filepath.Join(os.Getenv("HOME"), ".ssh", "known_hosts")

type KnownHostMatch struct {
	Marker    string   `json:"marker"`
	Hosts     []string `json:"hosts"`
	PublicKey string   `json:"publicKey"`
	Comment   string   `json:"comment"`
}

func GetKnownHostsFile() ([]byte, error) {
	return os.ReadFile(KNOWN_HOSTS_PATH)
}

func GetKnownHostsForHost(host string) ([]KnownHostMatch, error) {
	contents, err := GetKnownHostsFile()
	if err != nil {
		return nil, err
	}

	var matches []KnownHostMatch

	scanner := bufio.NewScanner(bytes.NewReader(contents))
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		marker, hosts, publicKey, comment, _, err := ssh.ParseKnownHosts([]byte(line))
		if err != nil {
			continue
		}

		for _, knownHost := range hosts {
			if knownHost == host {
				matches = append(matches, KnownHostMatch{
					Marker:    marker,
					Hosts:     hosts,
					PublicKey: string(publicKey.Marshal()),
					Comment:   comment,
				})
				break
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return matches, nil
}
