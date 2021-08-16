import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = "https://localhost:44327/VehicleModels/details";
const editUrl = "https://localhost:44327/VehicleModels/edit";

const Edit = () => {
  const [vehicleModel, setVehicleModel] = useState({
    id: 0,
    name: "",
    abrv: "",
    vehicleMakeId: 0,
  });
  const { id } = useParams();

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
          id: vehicleModel.id,
          name: vehicleModel.name,
          abrv: vehicleModel.abrv,
          vehicleMakeId: vehicleModel.vehicleMakeId,
        }),
      };
      fetch(editUrl, requestOptions).then((response) => response);
    }
  };
  const getVehicleMake = async () => {
    const response = await fetch(`${url}/${id}`);
    const vehicleModel = await response.json();
    setVehicleModel(vehicleModel);
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
              <div></div>
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
        <Link to="/vehiclemodels">Back to list</Link>
      </div>
    </div>
  );
};

export default Edit;
