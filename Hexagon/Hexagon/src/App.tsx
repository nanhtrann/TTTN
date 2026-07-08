import { Puck, Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";
import puckConfig from "./puck-config";
import "./App.css";

function App() {
  const [pageData, setPageData] = useState<any>({
    content: [],
    root: {},
  });
  const [preview, setPreview] = useState(false);

  if (preview) {
    return (
      <div style={{ marginTop: '80px' }}>
        <button 
          onClick={() => setPreview(false)}
          style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}
        >
          Edit
        </button>
        <Render config={puckConfig} data={pageData} />
      </div>
    );
  }

  return (
    <Puck
      config={puckConfig}
      data={pageData}
      onPublish={(data: any) => {
        setPageData(data);
        setPreview(true);
      }}
    />
  );
}

export default App;