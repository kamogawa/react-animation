import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "styled-components";
import TypesApp from './App';
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TypesApp />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
