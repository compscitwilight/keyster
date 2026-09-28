// keys.go
//
// Contains app bindings that allow the client-side to interface
// with all SSH keys on disc.

package main

import (
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"filippo.io/keygen"
	"github.com/charmbracelet/keygen"
)

type KeyListing struct {
	Name       string           `json:"name"`
	AbsPath    string           `json:"absPath"`
	Algo       *KeyAlgo         `json:"algo"` // cryptographic algorithm
	HostConfig *HostDeclaration `json:"hostConfig"`
	KnownHosts []KnownHostMatch `json:"knownHosts"`
	Modified   time.Time        `json:"modified"`
}

type KeyAlgoType string

const (
	PUBLIC  KeyAlgoType = "public"
	PRIVATE KeyAlgoType = "private"
)

type KeyAlgo struct {
	Type KeyAlgoType `json:"type"`
	Algo string      `json:"algo"`
}

// GetKeys returns the list of all keys found in the SSH directory
func (a *App) GetKeys() *[]KeyListing {
	homeDirPath := os.Getenv("HOME")
	keysDirPath := filepath.Join(homeDirPath, ".ssh")
	keysDirContents, err := os.ReadDir(keysDirPath)
	if err != nil {
		fmt.Errorf("Failed to get key directory contents: ", err)
		return nil
	}

	cfg, err := GetSSHConfig()
	if err != nil {
		fmt.Errorf("Failed to retrieve SSH configuration: ", err)
		return nil
	}

	var listings []KeyListing
	for _, keyFile := range keysDirContents {
		if keyFile.IsDir() {
			continue
		}

		info, err := keyFile.Info()
		if err != nil {
			fmt.Errorf("Failed to retrieve key file info: ", err)
			continue
		}

		absPath := path.Join(keysDirPath, keyFile.Name())
		formattedPath := strings.ReplaceAll(absPath, homeDirPath, "~")
		// var associatedHost *ssh_config.Host
		host, err := GetHostBlockForKey(cfg, formattedPath)
		if err != nil {
			fmt.Errorf(err.Error())
		}

		contents, err := os.ReadFile(absPath)
		if err != nil {
			fmt.Errorf("Failed to read key file contents: ", err)
		}

		algo, err := IdentifyCryptographicAlgorithm(contents)
		if err != nil {
			fmt.Errorf("Failed to determine cryptographic algorithm for key file: ", err)
		}

		listing := KeyListing{
			Name:       info.Name(),
			AbsPath:    absPath,
			Algo:       algo,
			HostConfig: host,
			Modified:   info.ModTime(),
		}

		hostname := host.HostName
		if hostname != nil {
			knownHosts, err := GetKnownHostsForHost(*hostname)
			if err != nil {
				fmt.Errorf("Failed to retrieve known_hosts matches")
			}

			listing.KnownHosts = knownHosts
		}

		listings = append(listings, listing)
	}

	return &listings
}

// UploadKey takes the contents of the uploaded key file, creates a key
// file in ~/.ssh
func (a *App) UploadKey(name string, contents []byte) error {
	path := filepath.Join(os.Getenv("HOME"), ".ssh", name)
	if _, err := os.ReadFile(path); err == nil {
		return fmt.Errorf("a key file at %s already exists", path)
	}

	if err := os.WriteFile(path, contents, 0600); err != nil {
		return err
	}

	return nil
}

// GenerateKey generates a new SSH key pair
//
// Currently only supports PEM private keys
func (a *App) GenerateKeys(name string, keyType keygen.KeyType) error {
	if _, err := keygen.New(name, keygen.WithKeyType(keyType)); err != nil {
		return err
	}

	return nil
}
