import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePage.css";
import { observer } from "mobx-react";

const CreatePage = observer(({ vehicleModelsStore }) => {
  const history = useHistory();

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);
  const refVehicleMakeIdContainer = useRef(null);

  const load = async () => {
    vehicleModelsStore.loadVehicleModels();
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let vehicleModel = {
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
      vehicleMakeId: refVehicleMakeIdContainer.current.value,
    };

    await vehicleModelsStore.createVehicleModel(vehicleModel);
  };

  if (vehicleModelsStore.isCreated) {
    vehicleModelsStore.setIsCreated(false);
    history.push("/vehiclemodels");
  }

  if (vehicleModelsStore.isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
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
          className={`${
            vehicleModelsStore.createModelError.name ? "error" : null
          }`}
        />

        <label id="label-abrv" htmlFor="abrv">
          Abrv:
        </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          ref={refAbrvContainer}
          className={`${
            vehicleModelsStore.createModelError.abrv ? "error" : null
          }`}
        />

        <label htmlFor="selectMake">Vehicle Make:</label>
        <select ref={refVehicleMakeIdContainer}>
          {vehicleModelsStore.vehicleMakes.map((vehicleMake) => {
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
});

export default CreatePage;
