import { useState } from "react";
import { Puck, Render } from "@measured/puck";
import puckConfig from "./admin-puck-config";

import "./App.css";

function App() {
  const [pageData, setPageData] = useState({
    content: [],
  });

  const [preview, setPreview] = useState(false);

  if (preview) {
    return (
      <div>
        <div style={{ padding: "16px" }}>
          <button
            onClick={() => setPreview(false)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </div>

        <Render
          config={puckConfig}
          data={pageData}
        />
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