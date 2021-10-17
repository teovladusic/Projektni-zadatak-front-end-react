import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./Delete.css";
import {
  DeleteVehicleMake,
  GetVehicleMake,
} from "../../common/VehicleMakesService";

const Delete = () => {
  const history = useHistory();

  const { id } = useParams();
  const [vehicleMake, setVehicleMake] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await DeleteVehicleMake(vehicleMake.id);
    history.push("/vehicleMakes");
  };

  const getVehicleMake = async () => {
    setIsLoading(true);
    let vehicleMake = await GetVehicleMake(id);
    setVehicleMake(vehicleMake);
    setIsLoading(false);
  };

  useEffect(() => {
    getVehicleMake();
  }, []);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="container">
      <h1>Delete</h1>
      <h3>Are you sure you want to delete this?</h3>
      <hr />

      <div className="delete-make-body">
        <p className="name-placeholder">Name:</p>
        <p className="name">{vehicleMake.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleMake.abrv}</p>

        <button className="btn btn-danger" onClick={handleSubmit}>
          Delete
        </button>
      </div>

      <Link className="back-to-list" to="/vehiclemakes">
        Back to list
      </Link>
    </div>
  );
};

export default Delete;
