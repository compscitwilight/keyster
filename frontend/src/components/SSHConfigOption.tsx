import { ChangeEvent } from "react";
import { main } from "../../wailsjs/go/models";

const HostDeclarationFieldTypes = {
	host: "string",
	addressFamily: "string",
	batchMode: "boolean",
	bindAddress: "string",
	challengeResponseAuthentication: "boolean",
	checkHostIp: "boolean",
	cipher: "string",
	ciphers: "array",
	clearAllForwardings: "boolean",
	compression: "boolean",
	compressionLevel: "number",
	connectionAttempts: "number",
	connectTimeout: "number",
	controlMaster: "string",
	controlPath: "string",
	dynamicForward: "string",
	enableSSHKeysign: "boolean",
	escapeChar: "string",
	exitOnForwardFailure: "boolean",
	forwardAgent: "bolean",
	forwardX11: "boolean",
	forwardX11Trusted: "boolean",
	gatewayPorts: "boolean",
	globalKnownHostsFile: "string",
	gssAPIAuthentication: "boolean",
	gssAPIClientIdentity: "string",
	gssAPIDelegateCredentials: "boolean",
	gssAPIRenewalForcesRekey: "boolean",
	gssAPITrustDns: "boolean",
	hashKnownHosts: "boolean",
	hostBasedAuthentication: "boolean",
	hostKeyAlgorithms: "string",
	hostKeyAlias: "string",
	hostName: "string",
	identitiesOnly: "boolean",
	identityFile: "string",
	kbdInteractiveAuthentication: "boolean",
	kbdInteractiveDevices: "array",
	localCommand: "string",
	localForward: "string",
	logLevel: "string",
	noHostAuthenticationForLocalhost: "boolean",
	numberOfPasswordPrompts: "number",
	passwordAuthentication: "boolean",
	permitLocalCommand: "boolean",
	port: "number",
	preferredAuthentications: "array",
	protocol: "array",
	proxyCommand: "string",
	pubKeyAuthentication: "boolean",
	rekeyLimit: "string",
	remoteForward: "string",
	rhostsRSAAuthentication: "boolean",
	rsaAuthentication: "boolean",
	sendEnv: "string",
	serverAliveCountMax: "number",
	serverAliveInterval: "number",
	smartcardDevice: "string",
	strictHostKeyChecking: "string",
	tcpKeepAlive: "boolean",
	tunnel: "string",
	tunnelDevice: "string",
	usePrivilegedPort: "boolean",
	user: "string",
	userKnownHostsFile: "string",
	verifyHostKeyDNS: "string",
	visualHostKey: "boolean",
	xAuthLocation: "string",
} satisfies Record<keyof main.HostDeclaration, string>;

type SSHConfigValueType = string | boolean | string[] | undefined;
export function SSHConfigOption({
	name,
	value,
	index,
	onUpdate,
}: {
	name: keyof main.HostDeclaration;
	value: SSHConfigValueType;
	index?: number;
	onUpdate?: (newVal: SSHConfigValueType) => any;
}) {
	const inferredVal = HostDeclarationFieldTypes[name];
	return (
		<div
			className={`
			grid
			grid-cols-2
			${index !== undefined && (index % 2 === 0 ? "dark:bg-neutral-800" : "dark:bg-neutral-600")}
		`}
		>
			<strong>{name}</strong>
			<div>
				{/* input field for type string, boolean, and number */}
				<slot
					onChange={(e: ChangeEvent) => {
						if (!onUpdate) return;
						const target = e.target as HTMLInputElement;
						onUpdate(
							inferredVal === "string"
								? target.value
								: target.checked,
						);
					}}
				>
					{inferredVal === "string" && (
						<input type="text" defaultValue={value as string} />
					)}

					{inferredVal === "boolean" && (
						<input
							type="checkbox"
							defaultChecked={value as boolean}
						/>
					)}
				</slot>

				{inferredVal === "array" && <div></div>}
			</div>
		</div>
	);
}
