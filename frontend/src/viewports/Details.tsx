import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

import { ListingsContext, MenuStateContext, MenuStateValue } from "../contexts";
import { SSHConfigOption } from "../components/SSHConfigOption";
import { main } from "../../wailsjs/go/models";
import { SaveHostDeclaration } from "../../wailsjs/go/main/App";

export function DetailsViewport() {
	const menuStateContext = useContext(MenuStateContext);
	if (!menuStateContext) throw new Error("MenuStateContext not initialized");

	const keyListingsContext = useContext(ListingsContext);
	if (!keyListingsContext)
		throw new Error("ListingsContext is not initialized");

	const [hostConfig, setHostConfig] = useState<main.HostDeclaration>({});
	const [menuState, setMenuState] = menuStateContext;
	const [keyListings] = keyListingsContext;
	const [listing, setListing] = useState<main.KeyListing>();
	const [showNullOptions, setShowNullOptions] = useState<boolean>(false);

	const onGoBack = () =>
		setMenuState((s) => {
			const cp = {} as MenuStateValue;
			Object.assign(cp, s);
			cp.selectedKey = undefined;
			return cp;
		});

	const onHostConfigUpdate = (name: string, val: any) =>
		setHostConfig((cfg) => {
			if (!Object.keys(cfg).includes(name))
				throw new Error("Host configuration key not found");

			const cp = {} as Record<string, string>;
			Object.assign(cp, cfg);
			cp[name] = val;
			return cp as main.HostDeclaration;
		});

	function onSaveChanges() {
		if (!listing) return;
    SaveHostDeclaration(listing.name, hostConfig);
    setListing((ls) => {
      if (!ls) return;
      console.log("there is ls")
      const cp = {} as typeof ls;
      Object.assign(cp, ls);
      cp.hostConfig = hostConfig;
      return cp;
		})
	}

	useEffect(() => {
		const res = keyListings.find(
			(kl) => kl.absPath === menuState.selectedKey,
		);

		if (!res) throw new Error("Key listing not found");
		setListing(res);

		const cfg = res.hostConfig;
		if (!cfg) return;
		setHostConfig(cfg);
	}, []);

	return (
		listing && (
			<div className="">
				<div className="w-3/4 m-auto">
					<div className="flex select-none justify-between items-center mt-6">
						<ArrowLeft
							onClick={onGoBack}
							size={32}
							className="cursor-pointer"
						/>
						<div className="flex gap-2 items-center font-semibold text-2xl">
							<p>Details</p>
							<p>for</p>
							<code className="text-lg">{listing?.name}</code>
						</div>
					</div>
					<hr className="h-px mt-2 border-0 dark:bg-neutral-500 mb-8" />
				</div>

				<div className="grid grid-cols-2 gap-4 text-left mx-24">
					{/* meta details */}
					<div className="grid">
						<div className="grid gap-1">
							<h1 className="text-xl font-bold">Details</h1>
							<div className="flex justify-between">
								<strong>Name</strong>
								<p>{listing?.name}</p>
							</div>
							<div className="flex justify-between">
								<strong>Key type</strong>
								<p>{listing?.algo?.type || "unknown"}</p>
							</div>
							<div className="flex justify-between">
								<strong>Algorithm</strong>
								<p>{listing?.algo?.algo || "unknown"}</p>
							</div>
							{listing.modified && (
								<div className="flex flex-wrap justify-between">
									<strong>Last mod</strong>
									<p>
										{moment(
											new Date(listing.modified),
										).format("YYYY-MM-DD hh:mm:ss")}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* known_hosts (coming soon) */}
					<div>
						<h1 className="text-xl font-bold">Known hosts</h1>
						<p>...</p>
					</div>
				</div>

				{/* ssh_config */}
				<div className="grid text-left mx-24 mt-8">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-bold">
							SSH configuration options
						</h1>
						{JSON.stringify(hostConfig) !==
							JSON.stringify(listing.hostConfig) && (
							<button
								className="bg-blue-800 px-2 py-1 rounded-lg font-semibold text-lg cursor-pointer"
								onClick={onSaveChanges}
							>
								Save Changes
							</button>
						)}
					</div>
					<hr className="h-px my-1 border-0 dark:bg-neutral-500" />
					<div className="grid gap-1">
						{listing.hostConfig ? (
							<>
								{/* configured options */}
								{Object.entries(hostConfig)
									.filter(
										([name]) =>
											(
												listing.hostConfig as Record<
													string,
													any
												>
											)[name] !== null,
									)
									.map(([name, val], index) => (
										<SSHConfigOption
											key={name}
											name={
												name as keyof main.HostDeclaration
											}
											value={val}
											index={index}
											onUpdate={(newVal) =>
												onHostConfigUpdate(name, newVal)
											}
										/>
									))}

								{/* non-configured/null options */}
								<div className="mt-4">
									{
										<div
											onClick={() =>
												setShowNullOptions((s) => !s)
											}
											className="flex mb-4 justify-between text-xl font-bold border-b-4 cursor-pointer"
										>
											<p>
												{showNullOptions
													? "Hide non-configured options"
													: "Show non-configured options"}
											</p>
											{showNullOptions ? (
												<ChevronUp />
											) : (
												<ChevronDown />
											)}
										</div>
									}

									{showNullOptions && (
										<div className="grid gap-2">
											{Object.entries(hostConfig)
												.filter(
													([name]) =>
														(
															listing.hostConfig as Record<
																string,
																any
															>
														)[name] === null,
												)
												.map(([name, val], index) => (
													<SSHConfigOption
														key={name}
														name={
															name as keyof main.HostDeclaration
														}
														value={val}
														index={index + 1} // increment for continuity
														onUpdate={(newVal) =>
															onHostConfigUpdate(
																name,
																newVal,
															)
														}
													/>
												))}
										</div>
									)}
								</div>
							</>
						) : (
							<p>
								No host configuration was found for this key
								listing.
							</p>
						)}
					</div>
				</div>
			</div>
		)
	);
}
