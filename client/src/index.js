import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.min";
import "./assets/styles/bootstrap.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./components/layouts/alert/alertTemplate";
//import AlertTemplate from "react-alert-template-basic";
import App from "./App";

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById("root")
);
