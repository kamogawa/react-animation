import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);