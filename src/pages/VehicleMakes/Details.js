import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleMakes/details";

const Details = () => {
  const [vehicleMake, setVehicleMake] = useState({ id: 0, name: "", abrv: "" });
  const { id } = useParams();

  const getVehicleMake = async () => {
    const response = await fetch(`${url}/${id}`);
    const vehicleMake = await response.json();
    console.log(vehicleMake);
    setVehicleMake(vehicleMake);
  };
  useEffect(() => {
    getVehicleMake();
  }, []);

  return (
    <div className="container">
      <h1>Details</h1>
      <dl class="row">
        <dt class="col-sm-2">Name</dt>
        <dd class="col-sm-10">{vehicleMake.name}</dd>
        <dt class="col-sm-2">Abrv</dt>
        <dd class="col-sm-10">{vehicleMake.abrv}</dd>
      </dl>
      <Link to="/vehiclemakes">Back to List</Link>
    </div>
  );
};

export default Details;
