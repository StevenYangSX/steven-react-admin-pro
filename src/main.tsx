import React from "react";
import ReactDOM from "react-dom/client";
import "reset-css";
// ui framewokr import

// global css import
import "@/assets/styles/global.scss";
import App from "./App.tsx";

// import BrowserRouter
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
