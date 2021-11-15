import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePage.css";
import { observer } from "mobx-react";
import CreateModelStore from "../../stores/vehicle-models/CreateModelStore";

const CreatePage = observer(() => {
  const history = useHistory();

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);
  const refVehicleMakeIdContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let vehicleModel = {
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
      vehicleMakeId: refVehicleMakeIdContainer.current.value,
    };

    await CreateModelStore.createVehicleModel(vehicleModel);
  };

  if (CreateModelStore.isCreated) {
    CreateModelStore.setIsCreated(false);
    history.push("/vehiclemodels");
  }

  if (CreateModelStore.isLoading) {
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
            CreateModelStore.createModelError.name ? "error" : null
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
            CreateModelStore.createModelError.abrv ? "error" : null
          }`}
        />

        <label htmlFor="selectMake">Vehicle Make:</label>
        <select ref={refVehicleMakeIdContainer}>
          {CreateModelStore.vehicleMakes.map((vehicleMake) => {
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
