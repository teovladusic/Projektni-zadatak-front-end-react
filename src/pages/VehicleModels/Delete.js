import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  GetVehicleModel,
  DeleteVehicleModel,
} from "../../common/VehicleModelsService";
import "./Delete.css";

const Delete = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  const [vehicleModel, setvehicleModel] = useState();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await DeleteVehicleModel(id);
    history.push("/vehicleModels");
  };

  const getvehicleModel = async () => {
    let vehicleModel = await GetVehicleModel(id);
    setvehicleModel(vehicleModel);
    setIsLoading(false);
  };
  useEffect(() => {
    getvehicleModel();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <h1>Delete</h1>
      <h3>Are you sure you want to delete this?</h3>
      <hr />

      <div className="delete-model-body">
        <p className="name-placeholder">Name:</p>
        <p className="name">{vehicleModel.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleModel.abrv}</p>
        <p className="vehicle-make-placeholder">Vehicle Make:</p>
        <p className="vehicle-make">{vehicleModel.makeName}</p>

        <button className="btn btn-danger" onClick={handleSubmit}>
          Delete
        </button>
      </div>

      <Link className="back-to-list" to="/vehicleModels">
        Back to list
      </Link>
    </div>
  );
};

export default Delete;
