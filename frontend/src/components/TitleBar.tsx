import { X } from "lucide-react";

export function TitleBar() {
	return (
		<div id="titlebar" className="sticky w-full z-90 flex items-center select-none dark:bg-neutral-900 p-2" data-wails-drag>
			<strong className="flex-1">Keyster</strong>
			<div className="flex items-center gap-1">
				<div
					title="Close"
					className="p-1 border rounded-lg dark:border-neutral-800 dark:bg-neutral-950 cursor-pointer"
					// @ts-ignore
					onClick={() => window.runtime.Quit()}
				>
					<X />
				</div>
			</div>
		</div>
	);
}
