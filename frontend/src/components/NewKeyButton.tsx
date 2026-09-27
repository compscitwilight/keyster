import { useContext } from "react";
import { NewKeyDropdown } from "./NewKeyDropdown";
import { OverlayContext } from "../contexts";
import { Plus } from "lucide-react";

export function NewKeyButton() {
	const overlayContext = useContext(OverlayContext);
	if (!overlayContext) throw new Error("OverlayContext not initialized");

	const [overlay, setOverlay] = overlayContext;

  const onToggleNewKeyDropdown = () => setOverlay((o) => {
    const cp = {} as typeof overlay;
    Object.assign(cp, o);
    cp.newKeyDropdown = !cp.newKeyDropdown;
    return cp;
	})

	return (
		<div className="relative">
			<div
				className="flex
        p-1.5
        text-lg
        rounded-lg
        bg-purple-600
        font-semibold
        items-center
        gap-1
        cursor-pointer
        transition-bg
        duration-100
        hover:bg-purple-700
        "
        title="Import or generate an SSH key"
        onClick={onToggleNewKeyDropdown}
			>
				<Plus />
				<p>Add key</p>
			</div>

			{overlay.newKeyDropdown && <NewKeyDropdown />}
		</div>
	);
}
