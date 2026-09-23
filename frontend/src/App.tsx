import { useState } from "react";

import type { IKeyListing } from "./types";
import { ListingsContext, MenuStateContext, MenuStateValue } from "./contexts";
import { MainViewport } from "./viewports/Main";
import { DetailsViewport } from "./viewports/Details";

function App() {
	const [menuState, setMenuState] = useState<MenuStateValue>({});
	const [keyListings, setKeyListings] = useState<Array<IKeyListing>>(
		new Array(),
	);

	return (
		<div id="App">
			<MenuStateContext.Provider value={[menuState, setMenuState]}>
				<ListingsContext.Provider value={[keyListings, setKeyListings]}>
					{!menuState.selectedKey ? (
						<MainViewport />
					) : (
						<DetailsViewport />
					)}
				</ListingsContext.Provider>
			</MenuStateContext.Provider>
		</div>
	);
}

export default App;
