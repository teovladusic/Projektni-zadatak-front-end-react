import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleMakes/details";
const editUrl = "https://localhost:44327/VehicleMakes/edit";

const Edit = () => {
  const [vehicleMake, setVehicleMake] = useState({ id: 0, name: "", abrv: "" });
  const { id } = useParams();

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
          id: vehicleMake.id,
          name: vehicleMake.name,
          abrv: vehicleMake.abrv,
        }),
      };
      fetch(editUrl, requestOptions).then((response) => response);
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
      <h1>Edit</h1>

      <h4>Vehicle make</h4>
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

      <div>
        <Link to="/vehiclemakes">Back to list</Link>
      </div>
    </div>
  );
};

export default Edit;
