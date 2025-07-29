import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, Container } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Container maxWidth="md">
      <App />
    </Container>
  </React.StrictMode>
);
