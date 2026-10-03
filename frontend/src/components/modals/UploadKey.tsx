import { ChangeEvent, SubmitEvent, useContext, useState, useTransition } from "react";
import { OverlayContext } from "../../contexts";
import { UploadKey } from "../../../wailsjs/go/main/App";

export function UploadKeyModal() {
	const overlayContext = useContext(OverlayContext);
	if (!overlayContext) throw new Error("OverlayContext is not initialized");

	const [name, setName] = useState<string>();
  const [keyContents, setKeyContents] = useState<number[]>();

  const [isUploading, startUploading] = useTransition();
	const [, setOverlay] = overlayContext;

	async function onKeyUpload(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		if (!files || files.length === 0) return;
		const file = files[0];

		setName(file.name);

		const buf = await file.bytes();
		setKeyContents(Array.from(buf));
	}

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!name || !keyContents || isUploading) return;
    startUploading(() => {
      UploadKey(name, keyContents);
    });
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="text-left mb-4">
				<h1 className="text-2xl font-semibold mb-4">Upload SSH key</h1>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<label className="text-lg font-bold" htmlFor="name">
							Name
						</label>
						<input
							onChange={(e) => setName(e.target.value)}
							defaultValue={name}
							type="text"
							id="name"
							className="bg-neutral-900 p-2 rounded outline-none"
						/>
					</div>

					<div className="grid gap-1">
						<label className="text-lg font-bold" htmlFor="keyFile">
							Key File
            </label>
						<input
							onChange={onKeyUpload}
							type="file"
							id="keyFile"
							className="border border-dotted dark:border-gray-500
              p-4 cursor-pointer"
              />
					</div>
				</div>
			</div>

			<button
				className="bg-blue-600
        rounded p-2
        w-1/2 text-lg font-bold
        cursor-pointer transition-bg
        duration-100 hover:bg-blue-700
        disabled:bg-neutral-900 disabled:cursor-not-allowed"
				type="submit"
			>
				Save Key
			</button>
		</form>
	);
}
