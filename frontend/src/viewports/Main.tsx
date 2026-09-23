import { useContext, useEffect } from "react";
import { Search } from "../components/Search";

import type { IKeyListing } from "../types";
import { GetKeys } from "../../wailsjs/go/main/App";
import { ListingsContext, MenuStateContext, MenuStateValue } from "../contexts";
import { KeyListing } from "../components/KeyListing";

export function MainViewport() {
  const menuStateContext = useContext(MenuStateContext);
  if (!menuStateContext)
    throw new Error("MenuStateContext not initialized");

  const listingsContext = useContext(ListingsContext);
  if (!listingsContext)
    throw new Error("ListingsContext not initialized");

  const [menuState, setMenuState] = menuStateContext;
  const [keyListings, setKeyListings] = listingsContext;

  const setQuery = (newQuery: string) => setMenuState((s) => {
    const cp = {} as MenuStateValue;
    Object.assign(cp, s);
    cp.query = newQuery;
    return cp;
  })

  const onKeyListingClick = (absPath: string) => setMenuState((s) => {
    const cp = {} as MenuStateValue;
    Object.assign(cp, s);
    cp.selectedKey = absPath;
    return cp;
  })

 	useEffect(() => {
		GetKeys().then((results: Array<IKeyListing>) => {
			console.log(results);

       const { query } = menuState;
			if (query)
				results = results.filter((r) =>
					r.name.toLowerCase().includes(query.toLowerCase()),
				);

			setKeyListings(
				results.filter(
					(k) => k.algo !== null && !k.name.includes("known_hosts"),
				),
			);
		});
	}, [menuState.query]);

	return (
		<div>
			<div className="mt-4 mb-8">
				<Search onQuery={setQuery} />
			</div>

			<div className="grid gap-2 w-3/4 m-auto">
				{keyListings.map((listing) => (
					<KeyListing onClick={onKeyListingClick} key={listing.name} data={listing} />
				))}
			</div>

			<p>{keyListings.length}</p>
		</div>
	);
}
