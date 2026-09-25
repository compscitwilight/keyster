import { ChangeEvent } from "react";
import { main } from "../../wailsjs/go/models";

function getHostDeclarationType<K extends keyof main.HostDeclaration>(
	instance: main.HostDeclaration,
	key: K,
): main.HostDeclaration[K] {
	return instance[key];
}

type SSHConfigValueType = string | boolean | string[] | undefined;
export function SSHConfigOption({
	name,
	value,
	index,
	onUpdate,
}: {
	name: string;
	value: SSHConfigValueType;
	index?: number;
	onUpdate?: (newVal: SSHConfigValueType) => any;
}) {
	const inferredVal = getHostDeclarationType(
		{ [name]: value },
		name as keyof main.HostDeclaration,
	);
	console.log(inferredVal);
	return (
		<div
			className={`
			grid
			grid-cols-2
			${index !== undefined && (index % 2 === 0 ? "dark:bg-neutral-800" : "dark:bg-neutral-600")}
		`}
		>
			<strong>{name}</strong>
			<div>
				{/* input field for type string, boolean, and number */}
				<slot
					onChange={(e: ChangeEvent) => {
						if (!onUpdate) return;
						const target = e.target as HTMLInputElement;
						onUpdate(
							typeof inferredVal === "string"
								? target.value
								: target.checked,
						);
					}}
				>
					{typeof inferredVal === "string" && (
						<input type="text" defaultValue={value as string} />
					)}

					{typeof inferredVal === "boolean" && (
						<input
							type="checkbox"
							defaultChecked={value as boolean}
						/>
					)}
				</slot>

				{inferredVal instanceof Array && <div></div>}
			</div>
		</div>
	);
}
