import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { observer } from "mobx-react";
import ModelDetailsStore from "../../stores/vehicle-models/ModelDetailsStore";

const DetailsPage = observer(() => {
  const { id } = useParams();

  if (ModelDetailsStore.isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Details</h1>
      <hr />

      <div className="details-models-body">
        <p className="placeholder">Name:</p>
        <p className="name">
          {ModelDetailsStore.vehicleModelToSeeDetails.name}
        </p>
        <p className="placeholder">Abrv:</p>
        <p className="abrv">
          {ModelDetailsStore.vehicleModelToSeeDetails.abrv}
        </p>
        <p className="placeholder">Make Name:</p>
        <p className="make-name">
          {ModelDetailsStore.vehicleModelToSeeDetails.makeName}
        </p>
      </div>

      <Link className="back-to-list" to="/vehicleModels">
        Back to List
      </Link>
    </div>
  );
});

export default DetailsPage;
