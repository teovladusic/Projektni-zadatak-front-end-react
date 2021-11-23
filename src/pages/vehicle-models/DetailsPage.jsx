import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { observer, inject } from "mobx-react";
import ModelDetailsStore from "./ModelDetailsStore";

const DetailsPage = inject(provider => ({
  modelDetailsStore: new ModelDetailsStore(),
}))(
  observer(props => {
    const { id } = useParams();

    useEffect(() => {
      props.modelDetailsStore.onIdAssigned(id);
    }, []);

    if (props.modelDetailsStore.isLoading) {
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
            {props.modelDetailsStore.vehicleModelToSeeDetails.name}
          </p>
          <p className="placeholder">Abrv:</p>
          <p className="abrv">
            {props.modelDetailsStore.vehicleModelToSeeDetails.abrv}
          </p>
          <p className="placeholder">Make Name:</p>
          <p className="make-name">
            {props.modelDetailsStore.vehicleModelToSeeDetails.makeName}
          </p>
        </div>

        <Link className="back-to-list" to="/vehicleModels">
          Back to List
        </Link>
      </div>
    );
  })
);

export default DetailsPage;
