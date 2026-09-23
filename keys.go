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
)

type KeyListing struct {
	Name       string           `json:"name"`
	AbsPath    string           `json:"absPath"`
	Algo       *KeyAlgo         `json:"algo"` // cryptographic algorithm
	HostConfig *HostDeclaration `json:"hostConfig"`
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

		listings = append(listings, KeyListing{
			Name:       info.Name(),
			AbsPath:    absPath,
			Algo:       algo,
			HostConfig: host,
			Modified:   info.ModTime(),
		})
	}

	return &listings
}
