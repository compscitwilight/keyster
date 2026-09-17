// keys.go
//
// Contains app bindings that allow the client-side to interface
// with all SSH keys on disc.

package main

import (
	"fmt"
	"os"
	"path"
	"time"
)

type KeyListing struct {
	Name     string    `json:"name"`
	Algo     KeyAlgo   `json:"algo"` // cryptographic algorithm
	Modified time.Time `json:"modified"`
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
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Errorf("Failed to get user home directory: ", err)
		return nil
	}

	keysDirPath := path.Join(homeDir, ".ssh")
	keysDirContents, err := os.ReadDir(keysDirPath)
	if err != nil {
		fmt.Errorf("Failed to get key directory contents: ", err)
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
		contents, err := os.ReadFile(absPath)
		if err != nil {
			fmt.Errorf("Failed to read key file contents: ", err)
			continue
		}

		algo, err := IdentifyCryptographicAlgorithm(contents)
		if err != nil {
			fmt.Errorf("Failed to determine cryptographic algorithm for key file: ", err)
		}

		listings = append(listings, KeyListing{
			Name:     info.Name(),
			Algo:     *algo,
			Modified: info.ModTime(),
		})
	}

	return &listings
}
