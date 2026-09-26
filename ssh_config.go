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
	"reflect"
	"strconv"
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

// in the future, this will be platform-specific
var SSH_CONFIG_PATH = filepath.Join(os.Getenv("HOME"), ".ssh", "config")

// GetSSHConfig uses ssh_config to get a list of hosts defined in the
// SSH config file.
func GetSSHConfig() (*ssh_config.Config, error) {
	f, err := os.Open(SSH_CONFIG_PATH)
	if err != nil {
		return nil, err
	}

	cfg, err := ssh_config.Decode(f)
	if err != nil {
		return nil, err
	}

	return cfg, nil
}

func GetSSHConfigBytes() ([]byte, error) {
	return os.ReadFile(SSH_CONFIG_PATH)
}

func OverwriteSSHConfig(b []byte) error {
	return os.WriteFile(SSH_CONFIG_PATH, b, 0644)
}

// GetHostBlockForKey searches the SSH config and matches with an ssh_config.Host
// that corresponds to the key file.
func GetHostBlockForKey(cfg *ssh_config.Config, absPath string) (*HostDeclaration, error) {
	hostBlock := &HostDeclaration{}
	for _, host := range cfg.Hosts {
		nodes := host.Nodes
		this := &HostDeclaration{}
		for _, v := range nodes {
			trueString := v.String()
			if len(trueString) > 0 {
				trueString = trueString[1:]
			}

			segments := strings.Split(trueString, " ")
			if len(segments) < 2 {
				continue
			}

			key := segments[0]
			val := segments[1]

			decReflection := reflect.ValueOf(this).Elem()
			t := decReflection.Type()
			formattedKey := strings.ToLower(key)
			var fieldVal reflect.Value

			for i := 0; i < t.NumField(); i++ {
				structField := t.Field(i)
				jsonTag := strings.Split(structField.Tag.Get("json"), ",")[0]
				if strings.ToLower(structField.Name) == formattedKey || strings.ToLower(jsonTag) == formattedKey {
					fieldVal = decReflection.Field(i)
					break
				}
			}

			if !fieldVal.IsValid() {
				fmt.Errorf("Invalid field %s found", formattedKey)
				continue
			}

			if fieldVal.Kind() != reflect.Ptr {
				return nil, fmt.Errorf("Expected pointer value for %s", formattedKey)
			}

			elemType := fieldVal.Type().Elem()
			newPtr := reflect.New(elemType)
			elem := newPtr.Elem()

			switch elem.Kind() {
			case reflect.String:
				elem.SetString(val)
			case reflect.Bool:
				switch strings.ToLower(val) {
				case "yes", "true", "on", "1":
					elem.SetBool(true)
				case "no", "false", "off", "0":
					elem.SetBool(false)
				}
			case reflect.Uint:
				u, err := strconv.ParseUint(val, 10, 64)
				if err != nil {
					return nil, fmt.Errorf("invalid uint %q for %s", val, key)
				}
				elem.SetUint(u)
			case reflect.Int:
				i, err := strconv.ParseInt(val, 10, 64)
				if err != nil {
					return nil, fmt.Errorf("invalid int %d for %s", val, key)
				}
				elem.SetInt(i)
			case reflect.Slice:
				log.Println("slice")
			default:
				return nil, fmt.Errorf("unsupported field type %s for type %s", elem.Kind(), key)
			}

			fieldVal.Set(newPtr)
		}

		if this.IdentityFile != nil && *this.IdentityFile == absPath {
			hostBlock = this
		}
	}

	if hostBlock == nil {
		return nil, fmt.Errorf("failed to find host declaration for key")
	}

	return hostBlock, nil
}

// SaveHostDeclaration takes the provided declaration and constructs a new host
// block to add or replace the existing declaration in ~/.ssh/config
func (*App) SaveHostDeclaration(name string, newDeclaration HostDeclaration) error {
	contentsBytes, err := GetSSHConfigBytes()
	if err != nil {
		return err
	}

	lines := strings.Split(string(contentsBytes), "\n")

	var hostStart int = -1 // starting line indice of host declaration
	var hostEnd int = -1

	for i, rawLine := range lines {
		line := strings.TrimSpace(rawLine)

		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		fields := strings.Fields(line)
		if len(fields) == 0 {
			continue
		}

		if strings.EqualFold(fields[0], "Host") {
			if hostStart != -1 {
				hostEnd = i
				break
			}

			for _, pattern := range fields[1:] {
				if pattern == name {
					hostStart = i
					break
				}
			}
		}
	}

	// last block in ~/.ssh/config
	if hostStart != -1 && hostEnd == -1 {
		hostEnd = len(lines)
	}

	newBlock := fmt.Sprintf("Host %s\n", name)
	v := reflect.ValueOf(newDeclaration)
	t := reflect.TypeOf(newDeclaration)

	if v.Kind() == reflect.Ptr {
		if !v.IsNil() {
			v = v.Elem()
			t = t.Elem()
		}
	}

	log.SetFlags(0)
	for i := 0; i < v.NumField(); i++ {
		fieldName := t.Field(i).Name
		fieldVal := v.Field(i)

		if fieldVal.Kind() != reflect.Ptr || fieldVal.IsNil() {
			continue
		}

		// fieldType := fieldVal.Elem().Kind()
		elem := fieldVal.Elem()
		switch elem.Kind() {
		case reflect.String, reflect.Int:
			strVal := strings.Trim(elem.String(), "")
			if len(strVal) > 0 {
				newBlock += fmt.Sprintf("\t%s %s\n", fieldName, strVal)
			}
		case reflect.Bool:
			var boolVal string
			if elem.Bool() {
				boolVal = "yes"
			} else {
				boolVal = "no"
			}

			newBlock += fmt.Sprintf("\t%s %s\n", fieldName, boolVal)
		case reflect.Slice:
			log.Println("needs support")
		default:
			log.Printf("Unsupported field type for %s\n", fieldName)
			continue
		}
	}

	// when both hostStart and hostEnd are resolved to -1, this means
	// that a configuration block for the specified key does not exist
	//
	// in this case, we simply append to the lines a totally new block
	var newBytes []byte
	if hostStart == -1 && hostEnd == -1 {
		lines = append(lines, strings.Split(newBlock, "\n")...)
		newBytes = []byte(strings.Join(lines, "\n"))
	} else {
		newBlock = strings.Trim(newBlock, "\n")
		newLines := strings.Split(newBlock, "\n")
		updatedLines := make([]string, 0, len(lines)-(hostEnd-hostStart)+len(newLines))
		updatedLines = append(updatedLines, lines[:hostStart]...)
		updatedLines = append(updatedLines, newLines...)
		updatedLines = append(updatedLines, lines[hostEnd:]...)
		newBytes = []byte(strings.Join(updatedLines, "\n"))
	}

	if newBytes == nil {
		return fmt.Errorf("failed to prepare for SSH config overwrite")
	}

	log.Println("saving new contents")
	return OverwriteSSHConfig(newBytes)
}
