import { KeyRound, Upload } from "lucide-react";

export function NewKeyDropdown() {
  return (
    <div className="absolute p-3 mt-1 text-nowrap rounded-lg dark:bg-neutral-900">
      <div className="grid gap-4 cursor-pointer">
        <div className="flex items-center gap-1.5 text-lg">
          <KeyRound size={36} />
          <p>Generate SSH key</p>
        </div>
        <div className="flex items-center gap-1.5 text-lg">
          <Upload size={36} />
          <p>Upload SSH key</p>
        </div>
      </div>
    </div>
  )
}
