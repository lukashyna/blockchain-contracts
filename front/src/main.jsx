import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import BlockchainProvider from "./context/BlockchainProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import theme from "./themes/theme.js";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <BlockchainProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BlockchainProvider>
  </BrowserRouter>
);
