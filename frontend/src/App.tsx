import React, { useState } from "react";

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
				<OverlayContext.Provider
					value={[overlayState, setOverlayState]}
				>
					<ListingsContext.Provider
						value={[keyListings, setKeyListings]}
					>
						<div className="relative">
							{overlayState.modal && (
								<div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    onClick={() => setOverlayState((s) => {
                      const cp = {} as typeof s;
                      cp.modal = undefined;
                      return cp;
                    })}
										className="fixed inset-0 dark:bg-black/25 transition-opacity"
									></div>
									<div className="relative z-10 flex max-h-[90vh] w-full max-w-screen-sm flex-col rounded-lg dark:bg-neutral-950 p-6 shadow-xl">
										{overlayState.modal}
									</div>
								</div>
							)}
							<div className="absolute w-full">
								{!menuState.selectedKey ? (
									<MainViewport />
								) : (
									<DetailsViewport />
								)}
							</div>
						</div>
					</ListingsContext.Provider>
				</OverlayContext.Provider>
			</MenuStateContext.Provider>
		</div>
	);
}

export default App;
