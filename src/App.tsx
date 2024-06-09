import { Button } from "antd";
import "./App.css";
import Buttonlang from "./components/buttonlang/buttonlang";
import FormComponent from "./components/form/form";

function App() {
  return (
    <div>
      <Buttonlang />
      <div style={{ textAlign: "right", padding:'0 10px' }}>
        <Button>Home</Button>
      </div>
      <FormComponent />
    </div>
  );
}

export default App;
