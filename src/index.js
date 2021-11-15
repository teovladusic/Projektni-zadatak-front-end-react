import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import VehicleMakesIndexStore from "./stores/vehicle-makes/VehicleMakesIndexStore.js";

ReactDOM.render(
  <Provider vehicleMakesIndexStore={new VehicleMakesIndexStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
