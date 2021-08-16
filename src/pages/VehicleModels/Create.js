import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const createUrl = "https://localhost:44327/VehicleModels/create";

const Create = () => {
  const [vehicleModel, setVehicleModel] = useState({
    id: 0,
    name: "",
    abrv: "",
    vehicleMakeId: 0,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVehicleModel({ ...vehicleModel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleModel.name && vehicleModel.abrv) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: vehicleModel.name,
          abrv: vehicleModel.abrv,
          vehicleMakeId: vehicleModel.vehicleMakeId,
        }),
      };
      fetch(createUrl, requestOptions).then((response) => response);
    }
  };
  return (
    <div className="container">
      <h1>Create</h1>
      <h4>Vehicle Model</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form>
            <div className="form-control">
              <div>
                <label htmlFor="name">Name : </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={vehicleModel.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="abrv">Abrv : </label>
                <input
                  type="text"
                  id="abrv"
                  name="abrv"
                  value={vehicleModel.abrv}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="vehicleMakeId">VehicleMakeId : </label>
                <input
                  type="number"
                  id="vehicleMakeId"
                  name="vehicleMakeId"
                  value={vehicleModel.vehicleMakeId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
