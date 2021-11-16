import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./container";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
