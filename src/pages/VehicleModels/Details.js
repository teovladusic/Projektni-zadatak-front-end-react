import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleModels/details";

const Details = () => {
  const [vehicleModel, setVehicleModel] = useState({
    id: 0,
    name: "",
    abrv: "",
    makeName: "",
  });
  const { id } = useParams();

  const getVehicleMake = async () => {
    const response = await fetch(`${url}/${id}`);
    const vehicleModel = await response.json();
    console.log(vehicleModel);
    setVehicleModel(vehicleModel);
  };
  useEffect(() => {
    getVehicleMake();
  }, []);

  return (
    <div className="container">
      <h1>Details</h1>
      <dl class="row">
        <dt class="col-sm-2">Name</dt>
        <dd class="col-sm-10">{vehicleModel.name}</dd>
        <dt class="col-sm-2">Abrv</dt>
        <dd class="col-sm-10">{vehicleModel.abrv}</dd>
        <dt class="col-sm-2">Make Name</dt>
        <dd class="col-sm-10">{vehicleModel.makeName}</dd>
      </dl>
      <Link to="/vehicleModels">Back to List</Link>
    </div>
  );
};

export default Details;
