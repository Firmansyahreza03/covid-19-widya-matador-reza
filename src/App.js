import logo from "./logo.svg";
import "./App.css";
import Covid from "./components/Table/Table";
import "antd/dist/antd.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { SideProvider } from "./Context/SideCtx";

function App() {
  return (
    <SideProvider>
      <div className="App">
        <Covid />
      </div>
    </SideProvider>
  );
}

export default App;
