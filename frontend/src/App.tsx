import { useState, useEffect } from "react";
import { Search } from "./components/Search";

import type { IKeyListing } from "./types";
import { GetKeys } from "../wailsjs/go/main/App";
import { KeyListing } from "./components/KeyListing";

function App() {
	const [query, setQuery] = useState<string>();
	const [keyListings, setKeyListings] = useState<Array<IKeyListing>>(
		new Array(),
	);

	useEffect(() => {
		GetKeys().then((results: Array<IKeyListing>) => {
			console.log(results);

			if (query)
				results = results.filter((r) =>
					r.name.toLowerCase().includes(query.toLowerCase()),
				);

			setKeyListings(
				results.filter(
					(k) => k.algo !== null && !k.name.includes("known_hosts")
				),
			);
		});
	}, [query]);

	return (
		<div id="App">
			<div className="mt-4 mb-8">
				<Search onQuery={setQuery} />
			</div>

			<div className="grid gap-2 w-3/4 m-auto">
				{keyListings.map((listing) => (
					<KeyListing key={listing.name} data={listing} />
				))}
			</div>

			<p>{keyListings.length}</p>
		</div>
	);
}

export default App;
