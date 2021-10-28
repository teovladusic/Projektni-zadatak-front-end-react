import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { observer } from "mobx-react";

const DetailsPage = observer(({ vehicleMakesStore }) => {
  const { id } = useParams();

  const getVehicleMake = async () => {
    let make = await vehicleMakesStore.getVehicleMake(id);
    vehicleMakesStore.setVehicleMakeToSeeDetails(make);
    vehicleMakesStore.isLoading = false;
  };

  useEffect(() => {
    vehicleMakesStore.isLoading = true;
    getVehicleMake();
  }, []);

  if (vehicleMakesStore.isLoading) {
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
        <p className="name">{vehicleMakesStore.vehicleMakeToSeeDetails.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleMakesStore.vehicleMakeToSeeDetails.abrv}</p>
      </div>

      <Link className="back-to-list" to="/vehiclemakes">
        Back to list
      </Link>
    </div>
  );
});

export default DetailsPage;
