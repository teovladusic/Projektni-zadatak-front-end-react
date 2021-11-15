import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { observer } from "mobx-react";
import MakeDetailsStore from "../../stores/vehicle-makes/MakeDetailsStore";

const DetailsPage = observer(() => {
  const { id } = useParams();

  if (MakeDetailsStore.isLoading) {
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
      <div className="details-make-body">
        <p className="name-placeholder">Name:</p>
        <p className="name">{MakeDetailsStore.vehicleMakeToSeeDetails.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{MakeDetailsStore.vehicleMakeToSeeDetails.abrv}</p>
      </div>

      <Link className="back-to-list" to="/vehiclemakes">
        Back to list
      </Link>
    </div>
  );
});

export default DetailsPage;
