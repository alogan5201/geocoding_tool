/**
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import "./init";
import "./ReactotronConfig";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import 'src/index.css'
import {
  setUseWhatChange,
} from '@simbathesailor/use-what-changed';
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
const { VITE_NODE_ENV } = import.meta.env;
setUseWhatChange(VITE_NODE_ENV === 'development');

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
 