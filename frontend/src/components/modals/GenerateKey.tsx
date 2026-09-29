import { useState, useContext, useTransition } from "react";
import { OverlayContext } from "../../contexts";
import { GenerateKeys } from "../../../wailsjs/go/main/App";

const KeyTypes = ["rsa", "ed25519", "ecdsa"];

export function GenerateKeyModal() {
  const overlayContext = useContext(OverlayContext);
  if (!overlayContext) throw new Error("OverlayContext not initialized");
  const [, setOverlay] = overlayContext;

	const [name, setName] = useState<string>();
  const [keyType, setKeyType] = useState<string>(KeyTypes[0]);

  const [isGenerating, startGenerating] = useTransition()
  const [error, setError] = useState<string>();

	function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!name || !keyType) {
      return setError("Both a name and key type are required");
    }

    startGenerating(async () => {
      await GenerateKeys(name, keyType);
    });

    setOverlay((o) => {
      const cp = {} as typeof o;
      cp.modal = undefined;
      return cp;
    });
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="text-left mb-4">
				<h1 className="text-2xl font-semibold mb-4">
					Generate SSH key pair
				</h1>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<label className="text-lg font-bold" htmlFor="name">
							Name
						</label>
						<input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
							id="name"
							className="bg-neutral-900 p-2 rounded outline-none"
						/>
					</div>

					<div className="grid gap-1">
						<label className="text-lg font-bold" htmlFor="keyType">
							Key Type
						</label>
						<select
              onChange={(e) => setKeyType(e.target.value)}
							defaultValue={keyType}
							id="keyType"
							className="p-2 rounded outline-none cursor-pointer dark:bg-neutral-900 appearance-none"
						>
							{KeyTypes.map((kt) => (
								<option value={kt}>{kt.toUpperCase()}</option>
							))}
						</select>
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
				disabled={isGenerating}
			>
				Generate Pair
      </button>

      {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
		</form>
	);
}
