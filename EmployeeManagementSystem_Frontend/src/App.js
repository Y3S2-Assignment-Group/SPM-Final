import { store } from "./store/store";
import { Provider } from "react-redux";
import Routes from "./routes/index";
import "./text.css"

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
