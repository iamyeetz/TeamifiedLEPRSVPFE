import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.js";
import { EventProvider } from "./context/EventContext.js"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <EventProvider>
      <App />
      </EventProvider>
    </UserProvider>
  </StrictMode>
);
