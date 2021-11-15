import React from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";
import VehicleMakesListComponent from "./VehicleMakesListComponent";
import VehicleMakesFormComponent from "./VehicleMakesFormComponent";
import { inject, observer } from "mobx-react";

const IndexPage = inject("vehicleMakesIndexStore")(
  observer((props) => {
    return (
      <div className="container">
        <h1>Vehicle Makes</h1>
        <Link className="create-link" to="/vehiclemakes/create">
          Create New Make
        </Link>
        <hr />
        <VehicleMakesFormComponent store={props.vehicleMakesIndexStore} />
        <VehicleMakesListComponent store={props.vehicleMakesIndexStore} />
      </div>
    );
  })
);

export default IndexPage;
