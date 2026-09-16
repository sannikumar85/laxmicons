import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserContext";
import NotificationContextProvider from "./context/NotificationContext";

import "./styles/index.css";
import "./styles/animations.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);