import React, { createContext } from "react";

// Types
type StateContextValue<T> = React.Dispatch<React.SetStateAction<T>> | null;

interface MenuStateValue {
	// When set to a key's `absPath` (used as identifier),
	// shows a details page (viewports/Details.tsx)
	selectedKey?: string;
};

// Contexts
export const MenuStateContext = createContext<StateContextValue<MenuStateValue>>(null);
