import { useState } from "react";

import { main } from "../wailsjs/go/models";
import {
	ListingsContext,
	MenuStateContext,
	MenuStateValue,
	OverlayContext,
  OverlayContextValue,
} from "./contexts";
import { MainViewport } from "./viewports/Main";
import { DetailsViewport } from "./viewports/Details";

function App() {
	const [menuState, setMenuState] = useState<MenuStateValue>({});
	const [keyListings, setKeyListings] = useState<Array<main.KeyListing>>(
		new Array(),
  );
  const [overlayState, setOverlayState] = useState<OverlayContextValue>({});

	return (
		<div id="App">
			<MenuStateContext.Provider value={[menuState, setMenuState]}>
				<OverlayContext.Provider value={[overlayState, setOverlayState]}>
					<ListingsContext.Provider
						value={[keyListings, setKeyListings]}
					>
						{!menuState.selectedKey ? (
							<MainViewport />
						) : (
							<DetailsViewport />
						)}
					</ListingsContext.Provider>
				</OverlayContext.Provider>
			</MenuStateContext.Provider>
		</div>
	);
}

export default App;
