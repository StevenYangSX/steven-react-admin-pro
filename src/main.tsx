import ReactDOM from "react-dom/client";
import "reset-css";
// ui framewokr import

// global css import
import "@/assets/styles/global.scss";
import App from "./App.tsx";

// import BrowserRouter
import { BrowserRouter } from "react-router-dom";

// state management
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
