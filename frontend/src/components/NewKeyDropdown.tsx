import { useContext } from "react";
import { KeyRound, Upload } from "lucide-react";
import { OverlayContext } from "../contexts";
import { GenerateKeyModal } from "./modals/GenerateKey";
import { UploadKeyModal } from "./modals/UploadKey";

export function NewKeyDropdown() {
	const overlayContext = useContext(OverlayContext);
	if (!overlayContext) throw new Error("OverlayContext not initialized");

	const [, setOverlay] = overlayContext;

	const showModal = (modal: React.ReactElement) =>
		setOverlay((o) => {
			const cp = {} as typeof o;
			Object.assign(cp, o);
			cp.newKeyDropdown = false;
			cp.modal = modal;
			return cp;
		});

	return (
		<div className="absolute z-10 p-3 mt-1 text-nowrap rounded-lg dark:bg-neutral-900">
			<div className="grid gap-4 cursor-pointer">
				<div
					onClick={() => showModal(<GenerateKeyModal />)}
					className="flex items-center gap-1.5 text-lg"
				>
					<KeyRound size={36} />
					<p>Generate SSH key</p>
				</div>
				<div
					onClick={() => showModal(<UploadKeyModal />)}
					className="flex items-center gap-1.5 text-lg"
				>
					<Upload size={36} />
					<p>Upload SSH key</p>
				</div>
			</div>
		</div>
	);
}
