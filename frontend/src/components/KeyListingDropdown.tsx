import { Info } from "lucide-react";

export function KeyListingDropdown() {
  return (
    <div className="absolute bg-neutral-900 rounded p-3 z-99">
      <div className="grid gap-2">
        <div className="flex items-center gap-1 font-semibold cursor-pointer">
          <Info size={18} />
          <p>Details</p>
        </div>
      </div>
    </div>
  );
}
