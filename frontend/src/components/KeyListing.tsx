import { useState } from "react";
import { EllipsisVertical } from "lucide-react";

import type { IKeyListing } from "../types";
import { KeyListingDropdown } from "./KeyListingDropdown";

export function KeyListing({ data, onClick }: {
  data: IKeyListing;
  onClick?: (absPath: string) => any;
}) {
  const [optionsToggled, setOptionsToggled] = useState<boolean>(false);
  const algo = data.algo?.algo || "unknown";

  return (
    <div
      onClick={() => {
        if (onClick) onClick(data.absPath);
      }}
      title={`Click to view details for ${data.name}`}
      className="
      flex
      items-center
      dark:bg-neutral-800
      dark:border-neutral-900
      border
      p-3
      cursor-pointer
      transition-bg
      duration-100
      hover:dark:bg-neutral-700
      "
    >
      <div className="flex flex-1 items-center gap-2">
        <p className="text-lg font-bold">{data.name}</p>
        <p
          className={`
            border
            px-2 py-1
            rounded-full
            font-semibold
            select-none
            ${algo === "unknown" && "dark:bg-neutral-500 dark:border-neutral-950"}
            ${data.algo?.type === "private" && "dark:bg-purple-800 dark:border-purple-950"}
            ${data.algo?.type === "public" && "dark:bg-cyan-600 dark:border-cyan-800"}
        `}
        >
          {algo}
        </p>
      </div>

      <div className="relative">
        <div
          onClick={() => setOptionsToggled((s) => !s)}
          title="Options"
          className="cursor-pointer"
        >
          <EllipsisVertical />
        </div>

        {optionsToggled && <KeyListingDropdown />}
      </div>
    </div>
  );
}
