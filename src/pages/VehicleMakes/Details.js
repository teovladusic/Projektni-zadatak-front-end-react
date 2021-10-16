import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Details.css";
import { GetVehicleMake } from "../../common/VehicleMakesService";

const Details = () => {
  const { id } = useParams();
  const [vehicleMake, setVehicleMake] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getVehicleMake = async () => {
    setIsLoading(true);
    const vehicleMake = await GetVehicleMake(id);
    setVehicleMake(vehicleMake);
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

      <div className="details-make-body">
        <p className="name-placeholder">Name:</p>
        <p className="name">{vehicleMake.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleMake.abrv}</p>
      </div>

      <Link className="back-to-list" to="/vehiclemakes">
        Back to list
      </Link>
    </div>
  );
};

export default Details;
