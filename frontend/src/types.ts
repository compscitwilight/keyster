export interface IKeyListing {
	name: string;
	algo?: {
		type: "public" | "private";
		algo: string;
	};
	modified: string;
}
