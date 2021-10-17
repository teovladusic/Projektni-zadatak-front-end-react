import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Create.css";
import { GetVehicleMakes } from "../../common/VehicleMakesService";
import { CreateVehicleModel } from "../../common/VehicleModelsService";

const Create = () => {
  var [vehicleMakes, setVehicleMakes] = useState([]);
  const history = useHistory();

  const [abrvError, setAbrvError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);
  const refVehicleMakeIdContainer = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const LoadVehicleMakes = async () => {
    let params = {
      searchQuery: "",
      pageNumber: 1,
      pageSize: 50,
      orderBy: "Order By",
    };
    let makes = await GetVehicleMakes(params);
    setVehicleMakes(makes.vehicleMakes);
    setIsLoading(false);
  };

  useEffect(() => {
    LoadVehicleMakes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (refNameContainer.current.value) {
      setNameError(false);
    } else {
      setNameError(true);
      return;
    }

    if (refAbrvContainer.current.value) {
      setAbrvError(false);
    } else {
      setAbrvError(true);
      return;
    }

    let vehicleModel = {
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
      vehicleMakeId: refVehicleMakeIdContainer.current.value,
    };

    await CreateVehicleModel(vehicleModel);
    history.push("/vehiclemodels");
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>Create</h1>
      <h4>Vehicle Model</h4>
      <hr />

      <form className="create-model-form">
        <label id="label-name" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={refNameContainer}
          className={`${nameError ? "error" : null}`}
        />

        <label id="label-abrv" htmlFor="abrv">
          Abrv:
        </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          ref={refAbrvContainer}
          className={`${abrvError ? "error" : null}`}
        />

        <label htmlFor="selectMake">Vehicle Make:</label>
        <select ref={refVehicleMakeIdContainer}>
          {vehicleMakes.map((vehicleMake) => {
            return (
              <option value={vehicleMake.id} key={vehicleMake.id}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Create;
