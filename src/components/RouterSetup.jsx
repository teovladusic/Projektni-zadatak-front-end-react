import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import Navbar from "../layouts/NavbarLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import VehicleMakes from "../pages/vehicle-makes/IndexPage.jsx";
import EditMake from "../pages/vehicle-makes/EditPage.jsx";
import MakeDetails from "../pages/vehicle-makes/DetailsPage.jsx";
import DeleteMake from "../pages/vehicle-makes/DeletePage.jsx";
import CreateMake from "../pages/vehicle-makes/CreatePage.jsx";

import VehicleModels from "../pages/vehicle-models/IndexPage.jsx";
import EditModel from "../pages/vehicle-models/EditPage.jsx";
import ModelDetails from "../pages/vehicle-models/DetailsPage.jsx";
import DeleteModel from "../pages/vehicle-models/DeletePage.jsx";
import CreateModel from "../pages/vehicle-models/CreatePage.jsx";

import { observer } from "mobx-react";
import { Router, RouterStore } from "react-router-mobx";

const routerStore = new RouterStore();

const RouterSetup = observer(() => {
  return (
    <Router component={BrowserRouter} routerStore={routerStore}>
      <>
        <Navbar routerStore={routerStore} />
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
        <Route path="/vehiclemodels/edit/:id" children={<EditModel />}></Route>
        <Route
          path="/vehiclemodels/details/:id"
          children={<ModelDetails />}
        ></Route>
        <Route
          path="/vehiclemodels/delete/:id"
          children={<DeleteModel />}
        ></Route>
        <Route path="/vehiclemodels/create" children={<CreateModel />}></Route>
      </>
    </Router>
  );
});

export default RouterSetup;
