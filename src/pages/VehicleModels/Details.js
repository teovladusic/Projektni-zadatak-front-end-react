import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetVehicleModel } from "../../common/VehicleModelsService";
import "./Details.css";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleModel, setVehicleModel] = useState();
  const { id } = useParams();

  const getVehicleMake = async () => {
    let vehicleModel = await GetVehicleModel(id);
    setVehicleModel(vehicleModel);
    setIsLoading(false);
  };
  useEffect(() => {
    getVehicleMake();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <h1>Details</h1>
      <hr />

      <div className="details-models-body">
        <p className="placeholder">Name:</p>
        <p className="name">{vehicleModel.name}</p>
        <p className="placeholder">Abrv:</p>
        <p className="abrv">{vehicleModel.abrv}</p>
        <p className="placeholder">Make Name:</p>
        <p className="make-name">{vehicleModel.makeName}</p>
      </div>

      <Link className="back-to-list" to="/vehicleModels">
        Back to List
      </Link>
    </div>
  );
};

export default Details;
