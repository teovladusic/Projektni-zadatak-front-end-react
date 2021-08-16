import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleModels/details";
const deleteUrl = "https://localhost:44327/VehicleModels/delete";

const Delete = () => {
  const [vehicleModel, setvehicleModel] = useState({
    id: 0,
    name: "",
    abrv: "",
    makeName: "",
  });
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleModel.name && vehicleModel.abrv) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(`${deleteUrl}/${vehicleModel.id}`, requestOptions).then(
        (response) => response
      );
    }
  };

  const getvehicleModel = async () => {
    const response = await fetch(`${url}/${id}`);
    const vehicleModel = await response.json();
    console.log(vehicleModel);
    setvehicleModel(vehicleModel);
  };
  useEffect(() => {
    getvehicleModel();
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
          <dd class="col-sm-10">{vehicleModel.name}</dd>
          <dt class="col-sm-2">Abrv</dt>
          <dd class="col-sm-10">{vehicleModel.abrv}</dd>
          <dt class="col-sm-2">Make Name</dt>
          <dd class="col-sm-10">{vehicleModel.makeName}</dd>
        </dl>

        <form asp-action="Delete">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            Delete
          </button>
          <Link to="/vehicleModels">Back to list</Link>
        </form>
      </div>
    </div>
  );
};

export default Delete;
