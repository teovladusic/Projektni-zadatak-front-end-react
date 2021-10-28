import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";
import VehicleMakesListComponent from "./VehicleMakesListComponent";
import VehicleMakesFormComponent from "./VehicleMakesFormComponent";

const IndexPage = ({ vehicleMakesStore }) => {
  useEffect(() => {
    vehicleMakesStore.vehicleMakeToEdit = { name: "", abrv: "" };
    vehicleMakesStore.vehicleMakeToSeeDetails = { name: "", abrv: "" };
    vehicleMakesStore.vehicleMakeToDelete = { name: "", abrv: "" };
  }, []);

  return (
    <div className="container">
      <h1>Vehicle Makes</h1>
      <Link className="create-link" to="/vehiclemakes/create">
        Create New Make
      </Link>
      <hr />
      <VehicleMakesFormComponent vehicleMakesStore={vehicleMakesStore} />
      <VehicleMakesListComponent vehicleMakesStore={vehicleMakesStore} />
    </div>
  );
};

export default IndexPage;
