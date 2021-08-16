import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VehicleMakes from "./pages/VehicleMakes/Index";
import EditMake from "./pages/VehicleMakes/Edit";
import MakeDetails from "./pages/VehicleMakes/Details";
import DeleteMake from "./pages/VehicleMakes/Delete";
import CreateMake from "./pages/VehicleMakes/Create";

import VehicleModels from "./pages/VehicleModels/Index";
import EditModel from "./pages/VehicleModels/Edit";
import ModelDetails from "./pages/VehicleModels/Details";
import DeleteModel from "./pages/VehicleModels/Delete";
import CreateModel from "./pages/VehicleModels/Create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/VehicleMakes">
            <VehicleMakes />
          </Route>
          <Route path="/vehiclemakes/edit/:id" children={<EditMake />}></Route>
          <Route
            path="/vehiclemakes/details/:id"
            children={<MakeDetails />}
          ></Route>
          <Route
            path="/vehiclemakes/delete/:id"
            children={<DeleteMake />}
          ></Route>
          <Route path="/vehiclemakes/create" children={<CreateMake />}></Route>
          <Route exact path="/vehiclemodels">
            <VehicleModels />
          </Route>
          <Route
            path="/vehiclemodels/edit/:id"
            children={<EditModel />}
          ></Route>
          <Route
            path="/vehiclemodels/details/:id"
            children={<ModelDetails />}
          ></Route>
          <Route
            path="/vehiclemodels/delete/:id"
            children={<DeleteModel />}
          ></Route>
          <Route
            path="/vehiclemodels/create"
            children={<CreateModel />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
