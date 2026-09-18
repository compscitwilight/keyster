// ssh_config.go
//
// Internal data structures and functions for interfacing with
// ~/.ssh/config

package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/kevinburke/ssh_config"
)

// HostDeclaration contains all possible SSH options for host blocks
// in the SSH config.
//
// Source: https://linux.die.net/man/5/ssh_config
type HostDeclaration struct {
	Host                             *string   `json:"host"`
	AddressFamily                    *string   `json:"addressFamily"`
	BatchMode                        *bool     `json:"batchMode"`
	BindAddress                      *string   `json:"bindAddress"`
	ChallengeResponseAuthentication  *bool     `json:"challengeResponseAuthentication"`
	CheckHostIP                      *bool     `json:"checkHostIp"`
	Cipher                           *string   `json:"cipher"`
	Ciphers                          *[]string `json:"ciphers"`
	ClearAllForwardings              *bool     `json:"clearAllForwardings"`
	Compression                      *bool     `json:"compression"`
	CompressionLevel                 *uint     `json:"compressionLevel"`
	ConnectionAttempts               *int      `json:"connectionAttempts"`
	ConnectTimeout                   *uint     `json:"connectTimeout"`
	ControlMaster                    *string   `json:"controlMaster"`
	ControlPath                      *string   `json:"controlPath"`
	DynamicForward                   *string   `json:"dynamicForward"`
	EnabledSSHKeysign                *bool     `json:"enableSSHKeysign"`
	EscapeChar                       *string   `json:"escapeChar"`
	ExitOnForwardFailure             *bool     `json:"exitOnForwardFailure"`
	ForwardAgent                     *bool     `json:"forwardAgent"`
	ForwardX11                       *bool     `json:"forwardX11"`
	ForwardX11Trusted                *bool     `json:"forwardX11Trusted"`
	GatewayPorts                     *bool     `json:"gatewayPorts"`
	GlobalKnownHostsFile             *string   `json:"globalKnownHostsFile"`
	GSSAPIAuthentication             *bool     `json:"gssAPIAuthentication"`
	GSSAPIClientIdentity             *string   `json:"gssAPIClientIdentity"`
	GSSAPIDelegateCredentials        *bool     `json:"gssAPIDelegateCredentials"`
	GSSAPIRenewalForcesRekey         *bool     `json:"gssAPIRenewalForcesRekey"`
	GSSAPITrustDNS                   *bool     `json:"gssAPITrustDns"`
	HashKnownHosts                   *bool     `json:"hashKnownHosts"`
	HostbasedAuthentication          *bool     `json:"hostBasedAuthentication"`
	HostKeyAlgorithms                *string   `json:"hostKeyAlgorithms"`
	HostKeyAlias                     *string   `json:"hostKeyAlias"`
	HostName                         *string   `json:"hostName"`
	IdentitiesOnly                   *bool     `json:"identitiesOnly"`
	IdentityFile                     *string   `json:"identityFile"`
	KbdInteractiveAuthentication     *bool     `json:"kbdInteractiveAuthentication"`
	KbdInteractiveDevices            *[]string `json:"kbdInteractiveDevices"`
	LocalCommand                     *string   `json:"localCommand"`
	LocalForward                     *string   `json:"localForward"`
	LogLevel                         *string   `json:"logLevel"`
	NoHostAuthenticationForLocalhost *bool     `json:"noHostAuthenticationForLocalhost"`
	NumberOfPasswordPrompts          *uint     `json:"numberOfPasswordPrompts"`
	PasswordAuthentication           *bool     `json:"passwordAuthentication"`
	PermitLocalCommand               *bool     `json:"permitLocalCommand"`
	Port                             *uint     `json:"port"`
	PreferredAuthentications         *[]string `json:"preferredAuthentications"`
	Protocol                         *[]uint   `json:"protocol"`
	ProxyCommand                     *string   `json:"proxyCommand"`
	PubKeyAuthentication             *bool     `json:"pubKeyAuthentication"`
	RekeyLimit                       *string   `json:"rekeyLimit"`
	RemoteForward                    *string   `json:"remoteForward"`
	RhostsRSAAuthentication          *bool     `json:"rhostsRSAAuthentication"`
	RSAAuthentication                *bool     `json:"rsaAuthentication"`
	SendEnv                          *string   `json:"sendEnv"`
	ServerAliveCountMax              *uint     `json:"serverAliveCountMax"`
	ServerAliveInterval              *uint     `json:"serverAliveInterval"`
	SmartcardDevice                  *string   `json:"smartcardDevice"`
	StrictHostKeyChecking            *string   `json:"strictHostKeyChecking"`
	TCPKeepAlive                     *bool     `json:"tcpKeepAlive"`
	Tunnel                           *string   `json:"tunnel"`
	TunnelDevice                     *string   `json:"tunnelDevice"`
	UsePrivilegedPort                *bool     `json:"usePrivilegedPort"`
	User                             *string   `json:"user"`
	UserKnownHostsFile               *string   `json:"userKnownHostsFile"`
	VerifyHostKeyDNS                 *string   `json:"verifyHostKeyDNS"`
	VisualHostKey                    *bool     `json:"visualHostKey"`
	XAuthLocation                    *string   `json:"xAuthLocation"`
}

// GetSSHConfig uses ssh_config to get a list of hosts defined in the
// SSH config file.
func GetSSHConfig() (*ssh_config.Config, error) {
	path := filepath.Join(os.Getenv("HOME"), ".ssh", "config")
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	cfg, err := ssh_config.Decode(f)
	if err != nil {
		return nil, err
	}

	return cfg, nil
}

// GetHostBlockForKey searches the SSH config and matches with an ssh_config.Host
// that corresponds to the key file.
func GetHostBlockForKey(cfg *ssh_config.Config, absPath string) (*HostDeclaration, error) {
	var hostBlock *HostDeclaration
	for _, host := range cfg.Hosts {
		nodes := host.Nodes

		currentHostBlock := &HostDeclaration{}
		for _, v := range nodes {
			trueString := v.String()
			// log.Println(i)
			// log.Println(trueString)
			if len(trueString) > 0 {
				trueString = trueString[1:]
			}

			segments := strings.Split(trueString, " ")
			if len(segments) < 2 {
				continue
			}

			key := segments[0]
			val := segments[1]
			log.Println(key)
			log.Println(val)

			// TODO: map to HostDeclaration
		}

		if currentHostBlock.IdentityFile != nil && *currentHostBlock.IdentityFile == absPath {
			hostBlock = currentHostBlock
			break
		}
	}

	// log.Println(hostBlock)

	if hostBlock == nil {
		return nil, fmt.Errorf("failed to find host declaration for key")
	}

	return hostBlock, nil
}

// SaveHostDeclaration takes the provided declaration and constructs a new host
// block to add or replace the existing declaration in ~/.ssh/config
func (*App) SaveHostDeclaration(absPath string, newDeclaration *HostDeclaration) error {
	return nil
}
