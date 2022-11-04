import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as VTAAPPRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <VTAAPPRouter>
      <App />
    </VTAAPPRouter>
  </React.StrictMode>,
  document.getElementById("vtaapp_root")
);
