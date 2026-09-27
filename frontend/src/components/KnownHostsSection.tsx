import { main } from "../../wailsjs/go/models";

export function KnownHostsSection({
	knownHosts,
}: {
	knownHosts: main.KnownHostMatch[];
}) {
	if (knownHosts.length === 0)
		return (
			<p className="text-yellow-500 text-sm">
				No known hosts associated with this key were found.
			</p>
		);

	return (
		<div className="grid gap-1">
			{knownHosts.map((kh, index) => {
				return (
					<div
						className={`
						p-1.5
						rounded
						${index % 2 === 0 ? "dark:bg-neutral-800" : "dark:bg-neutral-900"}
						`}
          >
            <div className="flex items-center gap-1">
              <strong>Hosts:</strong>
              <p>{kh.hosts.join(", ")}</p>
            </div>
            <div className="flex items-center gap-1">
              <strong>Key:</strong>
              {kh.publicKey.slice(1, 21)}...
            </div>
					</div>
				);
			})}
		</div>
	);
}
