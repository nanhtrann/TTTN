import { Puck } from "@measured/puck";
import puckConfig from "./admin-puck-config";

import './App.css'

function App() {
  

  return (
    <Puck
      config={puckConfig}
      data={{
        content: []
      }}
      onPublish={(data) => {
        console.log(data);
      }}
    />
  )
}

export default App
