import { useState, useEffect } from "react";
import { Search } from "./components/Search";

import { GetKeys } from "../wailsjs/go/main/App";

function App() {
  const [query, setQuery] = useState<string>();
  const [keyListings, setKeyListings] = useState<Array<any>>(new Array());

  useEffect(() => {
    GetKeys().then((results) => {
      setKeyListings(results); // add filter logic here
    });
  }, [query]);

  return (
    <div id="App">
      <div className="mt-4 mb-2">
        <Search onQuery={setQuery} />
      </div>
      <p>{keyListings.length}</p>
    </div>
  );
}

export default App;
