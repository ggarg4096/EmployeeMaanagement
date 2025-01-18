import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./context/authContext.jsx";
// import dotenv from "dotenv";
// dotenv.config();
createRoot(document.getElementById("root")).render(
  <AuthContext>
    <App />
  </AuthContext>
);
