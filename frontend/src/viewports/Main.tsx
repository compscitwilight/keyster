import { useContext, useEffect, useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import { Search } from "../components/Search";

import { GetKeys } from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import { ListingsContext, MenuStateContext, MenuStateValue } from "../contexts";
import { KeyListing } from "../components/KeyListing";
import { NewKeyButton } from "../components/NewKeyButton";

export function MainViewport() {
	const menuStateContext = useContext(MenuStateContext);
	if (!menuStateContext) throw new Error("MenuStateContext not initialized");

	const listingsContext = useContext(ListingsContext);
	if (!listingsContext) throw new Error("ListingsContext not initialized");

	const [menuState, setMenuState] = menuStateContext;
	const [keyListings, setKeyListings] = listingsContext;
	const [isLoading, startLoading] = useTransition();

	const setQuery = (newQuery: string) =>
		setMenuState((s) => {
			const cp = {} as MenuStateValue;
			Object.assign(cp, s);
			cp.query = newQuery;
			return cp;
		});

	const onKeyListingClick = (absPath: string) =>
		setMenuState((s) => {
			const cp = {} as MenuStateValue;
			Object.assign(cp, s);
			cp.selectedKey = absPath;
			return cp;
		});

	const retrieveKeys = () => {
		startLoading(() => {
			setKeyListings([]);
			GetKeys().then((results: Array<main.KeyListing>) => {
				console.log(results);

				const { query } = menuState;
				if (query)
					results = results.filter((r) =>
						r.name.toLowerCase().includes(query.toLowerCase()),
					);

				setKeyListings(
					results.filter(
						(k) =>
							k.algo !== null && !k.name.includes("known_hosts"),
					),
				);
			});
		});
	};

	useEffect(() => {
		retrieveKeys();
	}, [menuState.query]);

	return (
		<div>
			<div className="flex justify-center items-center gap-4 mt-4 mb-8">
				<Search onQuery={setQuery} />
				<NewKeyButton />
				<button
					onClick={retrieveKeys}
          className="p-2 rounded-lg dark:bg-neutral-900
          cursor-pointer disabled:cursor-not-allowed"
					disabled={isLoading}
				>
					<RefreshCcw />
				</button>
			</div>

			<div className="grid gap-2 w-8/10 m-auto">
				{keyListings.map((listing) => (
					<KeyListing
						onClick={onKeyListingClick}
						key={listing.name}
						data={listing}
					/>
				))}
			</div>

			<p>{keyListings.length}</p>
		</div>
	);
}
