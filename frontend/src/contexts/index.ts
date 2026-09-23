import React, { createContext } from "react";
import { IKeyListing } from "../types";

// Types
type StateContextValue<T> = [T, React.Dispatch<React.SetStateAction<T>>] | null;

export interface MenuStateValue {
	query?: string;

	// When set to a key's `absPath` (used as identifier),
	// shows a details page (viewports/Details.tsx)
	selectedKey?: string;
};

// Contexts
export const ListingsContext = createContext<StateContextValue<Array<IKeyListing>>>(null);
export const MenuStateContext = createContext<StateContextValue<MenuStateValue>>(null);
