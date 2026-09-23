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
}: {
	name: string;
	value: SSHConfigValueType;
	onUpdate?: (newVal: SSHConfigValueType) => any;
  }) {
  const inferredVal = getHostDeclarationType({ [name]: value }, name as keyof main.HostDeclaration);
	console.log(typeof inferredVal);
	return (
		<div className="flex justify-between">
			<strong>{name}</strong>
			{typeof inferredVal === "string" && (
				<input type="text" defaultValue={value as string} />
			)}
		</div>
	);
}
