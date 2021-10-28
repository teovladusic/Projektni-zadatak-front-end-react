import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";
import VehicleModelsFormComponent from "./VehicleModelsFormComponent";
import VehicleModelsListComponent from "./VehicleModelsListComponent";

const IndexPage = ({ vehicleModelsStore }) => {
  return (
    <div className="container">
      <h1>Vehicle Models</h1>
      <Link className="create-link" to="/vehiclemodels/create">
        Create New Model
      </Link>
      <hr />

      <VehicleModelsFormComponent vehicleModelsStore={vehicleModelsStore} />
      <VehicleModelsListComponent vehicleModelsStore={vehicleModelsStore} />
    </div>
  );
};

export default IndexPage;