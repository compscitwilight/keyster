export namespace main {
	
	export class HostDeclaration {
	    host?: string;
	    addressFamily?: string;
	    batchMode?: boolean;
	    bindAddress?: string;
	    challengeResponseAuthentication?: boolean;
	    checkHostIp?: boolean;
	    cipher?: string;
	    ciphers?: string[];
	    clearAllForwardings?: boolean;
	    compression?: boolean;
	    compressionLevel?: number;
	    connectionAttempts?: number;
	    connectTimeout?: number;
	    controlMaster?: string;
	    controlPath?: string;
	    dynamicForward?: string;
	    enableSSHKeysign?: boolean;
	    escapeChar?: string;
	    exitOnForwardFailure?: boolean;
	    forwardAgent?: boolean;
	    forwardX11?: boolean;
	    forwardX11Trusted?: boolean;
	    gatewayPorts?: boolean;
	    globalKnownHostsFile?: string;
	    gssAPIAuthentication?: boolean;
	    gssAPIClientIdentity?: string;
	    gssAPIDelegateCredentials?: boolean;
	    gssAPIRenewalForcesRekey?: boolean;
	    gssAPITrustDns?: boolean;
	    hashKnownHosts?: boolean;
	    hostBasedAuthentication?: boolean;
	    hostKeyAlgorithms?: string;
	    hostKeyAlias?: string;
	    hostName?: string;
	    identitiesOnly?: boolean;
	    identityFile?: string;
	    kbdInteractiveAuthentication?: boolean;
	    kbdInteractiveDevices?: string[];
	    localCommand?: string;
	    localForward?: string;
	    logLevel?: string;
	    noHostAuthenticationForLocalhost?: boolean;
	    numberOfPasswordPrompts?: number;
	    passwordAuthentication?: boolean;
	    permitLocalCommand?: boolean;
	    port?: number;
	    preferredAuthentications?: string[];
	    protocol?: number[];
	    proxyCommand?: string;
	    pubKeyAuthentication?: boolean;
	    rekeyLimit?: string;
	    remoteForward?: string;
	    rhostsRSAAuthentication?: boolean;
	    rsaAuthentication?: boolean;
	    sendEnv?: string;
	    serverAliveCountMax?: number;
	    serverAliveInterval?: number;
	    smartcardDevice?: string;
	    strictHostKeyChecking?: string;
	    tcpKeepAlive?: boolean;
	    tunnel?: string;
	    tunnelDevice?: string;
	    usePrivilegedPort?: boolean;
	    user?: string;
	    userKnownHostsFile?: string;
	    verifyHostKeyDNS?: string;
	    visualHostKey?: boolean;
	    xAuthLocation?: string;
	
	    static createFrom(source: any = {}) {
	        return new HostDeclaration(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.host = source["host"];
	        this.addressFamily = source["addressFamily"];
	        this.batchMode = source["batchMode"];
	        this.bindAddress = source["bindAddress"];
	        this.challengeResponseAuthentication = source["challengeResponseAuthentication"];
	        this.checkHostIp = source["checkHostIp"];
	        this.cipher = source["cipher"];
	        this.ciphers = source["ciphers"];
	        this.clearAllForwardings = source["clearAllForwardings"];
	        this.compression = source["compression"];
	        this.compressionLevel = source["compressionLevel"];
	        this.connectionAttempts = source["connectionAttempts"];
	        this.connectTimeout = source["connectTimeout"];
	        this.controlMaster = source["controlMaster"];
	        this.controlPath = source["controlPath"];
	        this.dynamicForward = source["dynamicForward"];
	        this.enableSSHKeysign = source["enableSSHKeysign"];
	        this.escapeChar = source["escapeChar"];
	        this.exitOnForwardFailure = source["exitOnForwardFailure"];
	        this.forwardAgent = source["forwardAgent"];
	        this.forwardX11 = source["forwardX11"];
	        this.forwardX11Trusted = source["forwardX11Trusted"];
	        this.gatewayPorts = source["gatewayPorts"];
	        this.globalKnownHostsFile = source["globalKnownHostsFile"];
	        this.gssAPIAuthentication = source["gssAPIAuthentication"];
	        this.gssAPIClientIdentity = source["gssAPIClientIdentity"];
	        this.gssAPIDelegateCredentials = source["gssAPIDelegateCredentials"];
	        this.gssAPIRenewalForcesRekey = source["gssAPIRenewalForcesRekey"];
	        this.gssAPITrustDns = source["gssAPITrustDns"];
	        this.hashKnownHosts = source["hashKnownHosts"];
	        this.hostBasedAuthentication = source["hostBasedAuthentication"];
	        this.hostKeyAlgorithms = source["hostKeyAlgorithms"];
	        this.hostKeyAlias = source["hostKeyAlias"];
	        this.hostName = source["hostName"];
	        this.identitiesOnly = source["identitiesOnly"];
	        this.identityFile = source["identityFile"];
	        this.kbdInteractiveAuthentication = source["kbdInteractiveAuthentication"];
	        this.kbdInteractiveDevices = source["kbdInteractiveDevices"];
	        this.localCommand = source["localCommand"];
	        this.localForward = source["localForward"];
	        this.logLevel = source["logLevel"];
	        this.noHostAuthenticationForLocalhost = source["noHostAuthenticationForLocalhost"];
	        this.numberOfPasswordPrompts = source["numberOfPasswordPrompts"];
	        this.passwordAuthentication = source["passwordAuthentication"];
	        this.permitLocalCommand = source["permitLocalCommand"];
	        this.port = source["port"];
	        this.preferredAuthentications = source["preferredAuthentications"];
	        this.protocol = source["protocol"];
	        this.proxyCommand = source["proxyCommand"];
	        this.pubKeyAuthentication = source["pubKeyAuthentication"];
	        this.rekeyLimit = source["rekeyLimit"];
	        this.remoteForward = source["remoteForward"];
	        this.rhostsRSAAuthentication = source["rhostsRSAAuthentication"];
	        this.rsaAuthentication = source["rsaAuthentication"];
	        this.sendEnv = source["sendEnv"];
	        this.serverAliveCountMax = source["serverAliveCountMax"];
	        this.serverAliveInterval = source["serverAliveInterval"];
	        this.smartcardDevice = source["smartcardDevice"];
	        this.strictHostKeyChecking = source["strictHostKeyChecking"];
	        this.tcpKeepAlive = source["tcpKeepAlive"];
	        this.tunnel = source["tunnel"];
	        this.tunnelDevice = source["tunnelDevice"];
	        this.usePrivilegedPort = source["usePrivilegedPort"];
	        this.user = source["user"];
	        this.userKnownHostsFile = source["userKnownHostsFile"];
	        this.verifyHostKeyDNS = source["verifyHostKeyDNS"];
	        this.visualHostKey = source["visualHostKey"];
	        this.xAuthLocation = source["xAuthLocation"];
	    }
	}
	export class KeyAlgo {
	    type: string;
	    algo: string;
	
	    static createFrom(source: any = {}) {
	        return new KeyAlgo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.algo = source["algo"];
	    }
	}
	export class KnownHostMatch {
	    marker: string;
	    hosts: string[];
	    publicKey: string;
	    comment: string;
	
	    static createFrom(source: any = {}) {
	        return new KnownHostMatch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.marker = source["marker"];
	        this.hosts = source["hosts"];
	        this.publicKey = source["publicKey"];
	        this.comment = source["comment"];
	    }
	}
	export class KeyListing {
	    name: string;
	    absPath: string;
	    algo?: KeyAlgo;
	    hostConfig?: HostDeclaration;
	    knownHosts: KnownHostMatch[];
	    // Go type: time
	    modified: any;
	
	    static createFrom(source: any = {}) {
	        return new KeyListing(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.absPath = source["absPath"];
	        this.algo = this.convertValues(source["algo"], KeyAlgo);
	        this.hostConfig = this.convertValues(source["hostConfig"], HostDeclaration);
	        this.knownHosts = this.convertValues(source["knownHosts"], KnownHostMatch);
	        this.modified = this.convertValues(source["modified"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

