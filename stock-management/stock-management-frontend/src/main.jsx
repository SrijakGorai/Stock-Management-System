import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider> {/* Wrap the app in AuthProvider */}
      <Container maxWidth="md">
        <App />
      </Container>
    </AuthProvider>
  </React.StrictMode>
);
