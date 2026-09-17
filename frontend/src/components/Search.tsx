import { ChangeEvent, useState } from "react";

export function Search(props: { onQuery: (query: string) => void }) {
  const [query, setQuery] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const onSearch = () => props.onQuery(query);

  return (
    <form className="flex justify-center gap-4">
      <input
        onChange={onChange}
        className="dark:bg-neutral-700 w-1/2 px-2 py-1 rounded-lg"
        placeholder="Query by name, algorithm, key type, etc"
        type="text"
      />
      <button
        onClick={onSearch}
        className="
        dark:bg-neutral-900
        p-2
        rounded-lg
        cursor-pointer
        shadow-lg
        dark:shadow-neutral-800
        font-bold
        text-lg
      "
      >
        Search
      </button>
    </form>
  );
}
