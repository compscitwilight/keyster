import { useState, useEffect } from "react";

import type { IKeyListing } from "./types";
import { ListingsContext, MenuStateContext, MenuStateValue } from "./contexts";
import { MainViewport } from "./viewports/Main";

function App() {
  const [menuState, setMenuState] = useState<MenuStateValue>({});

	const [keyListings, setKeyListings] = useState<Array<IKeyListing>>(
		new Array(),
	);

	return (
		<div id="App">
			<MenuStateContext.Provider value={[menuState, setMenuState]}>
				<ListingsContext.Provider value={[keyListings, setKeyListings]}>
					<MainViewport />
        </ListingsContext.Provider>


			</MenuStateContext.Provider>
		</div>
	);
}

export default App;
