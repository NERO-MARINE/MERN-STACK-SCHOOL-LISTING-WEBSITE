import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextPovider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextPovider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextPovider>
  </React.StrictMode>
);
