import React, { createContext } from "react";
import { main } from "../../wailsjs/go/models";

// Types
type StateContextValue<T> = [T, React.Dispatch<React.SetStateAction<T>>] | null;

export interface MenuStateValue {
	query?: string;

	// When set to a key's `absPath` (used as identifier),
	// shows a details page (viewports/Details.tsx)
	selectedKey?: string;
}

export interface OverlayContextValue {
	modal?: React.ReactNode;
	newKeyDropdown?: boolean;
}

// Contexts
export const ListingsContext =
	createContext<StateContextValue<Array<main.KeyListing>>>(null);
export const MenuStateContext =
	createContext<StateContextValue<MenuStateValue>>(null);
export const OverlayContext =
	createContext<StateContextValue<OverlayContextValue>>(null);
