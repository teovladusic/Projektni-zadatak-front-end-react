import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleMakes/details";
const deleteUrl = "https://localhost:44327/VehicleMakes/delete";

const Delete = () => {
  const [vehicleMake, setVehicleMake] = useState({
    id: 0,
    name: "",
    abrv: "",
  });
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleMake.name && vehicleMake.abrv) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(`${deleteUrl}/${vehicleMake.id}`, requestOptions).then(
        (response) => response
      );
    }
  };

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
      <h1>Delete</h1>
      <hr />
      <h3>Are you sure you want to delete this?</h3>
      <div>
        <hr />
        <dl class="row">
          <dt class="col-sm-2">Name</dt>
          <dd class="col-sm-10">{vehicleMake.name}</dd>
          <dt class="col-sm-2">Abrv</dt>
          <dd class="col-sm-10">{vehicleMake.abrv}</dd>
        </dl>

        <form asp-action="Delete">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            Delete
          </button>
          <Link to="/vehiclemakes">Back to list</Link>
        </form>
      </div>
    </div>
  );
};

export default Delete;
