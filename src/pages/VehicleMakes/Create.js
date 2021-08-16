import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const createUrl = "https://localhost:44327/VehicleMakes/create";

const Create = () => {
  const [vehicleMake, setVehicleMake] = useState({
    id: 0,
    name: "",
    abrv: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVehicleMake({ ...vehicleMake, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleMake.name && vehicleMake.abrv) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: vehicleMake.name,
          abrv: vehicleMake.abrv,
        }),
      };
      fetch(createUrl, requestOptions).then((response) => response);
    }
  };
  return (
    <div className="container">
      <h1>Create</h1>
      <h4>Vehicle Make</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form>
            <div className="form-control">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={vehicleMake.name}
                onChange={handleChange}
              />
              <label htmlFor="abrv">Abrv : </label>
              <input
                type="text"
                id="abrv"
                name="abrv"
                value={vehicleMake.abrv}
                onChange={handleChange}
              />
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
