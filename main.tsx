import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./main.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Ensure index.html has a div with id 'root'.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
