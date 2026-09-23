import { main } from "../wailsjs/go/models";

export interface IKeyListing {
	name: string;
	absPath: string;
	algo?: {
		type: "public" | "private";
		algo: string;
	};
	hostConfig?: main.HostDeclaration;
	modified: string;
}
