import logo from "./logo.svg";
import "./App.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Counter from "./components/Counter";

function App() {
  return (
    <div className="App">
      <h1>Counter</h1>
      <Counter defaultValue={150} step={2} />
    </div>
  );
}

export default App;
