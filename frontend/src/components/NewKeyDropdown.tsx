import { useContext } from "react";
import { KeyRound, Upload } from "lucide-react";
import { OverlayContext } from "../contexts";
import { GenerateKeyModal } from "./modals/GenerateKey";

export function NewKeyDropdown() {
	const overlayContext = useContext(OverlayContext);
	if (!overlayContext) throw new Error("OverlayContext not initialized");

	const [, setOverlay] = overlayContext;

	return (
		<div className="absolute z-10 p-3 mt-1 text-nowrap rounded-lg dark:bg-neutral-900">
			<div className="grid gap-4 cursor-pointer">
				<div
					onClick={() =>
						setOverlay((o) => {
							const cp = {} as typeof o;
							cp.modal = <GenerateKeyModal />;
							return cp;
						})
					}
					className="flex items-center gap-1.5 text-lg"
				>
					<KeyRound size={36} />
					<p>Generate SSH key</p>
				</div>
				<div className="flex items-center gap-1.5 text-lg">
					<Upload size={36} />
					<p>Upload SSH key</p>
				</div>
			</div>
		</div>
	);
}
