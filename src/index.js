import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
