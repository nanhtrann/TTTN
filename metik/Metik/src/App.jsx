import { useState } from "react";
import { Puck, Render } from "@measured/puck";
import puckConfig from "./puck-config";

import "./App.css";

function App() {
  const [pageData, setPageData] = useState({
    content: [],
  });

  const [preview, setPreview] = useState(false);

  if (preview) {
    return (
      <div>
        <div className="cursor-pointer fixed z-5000 bg-blue-400 top-5 left-5 rounded-2xl">
          <button
            onClick={() => setPreview(false)}
            className="cursor-pointer p-5 h-5 flex items-center justify-center text-white"
          >
            Edit
          </button>
        </div>

        <Render config={puckConfig} data={pageData} />
      </div>
    );
  }

  return (
    <Puck
      config={puckConfig}
      data={pageData}
      onPublish={(data) => {
        setPageData(data);
        setPreview(true);
      }}
    />
  );
}

export default App;