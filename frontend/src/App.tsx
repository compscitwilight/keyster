import { useState, useEffect } from "react";
import { GetKeys } from "../wailsjs/go/main/App";

function App() {
  const [keyListings, setKeyListings] = useState<Array<any>>([]);

  useEffect(() => {
    GetKeys().then((results) => {
      setKeyListings(results);
    });
  }, []);

  return (
    <div id="App">
      <p>{keyListings.length}</p>
    </div>
  );
}

export default App;
