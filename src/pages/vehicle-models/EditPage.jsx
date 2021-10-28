import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const EditPage = observer(({ vehicleModelsStore }) => {
  const history = useHistory();

  const { id } = useParams();

  const nameRefContainer = useRef(null);
  const abrvRefContainer = useRef(null);
  const vehicleMakeIdRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let vehicleModel = {
      id: id,
      name: nameRefContainer.current.value,
      abrv: abrvRefContainer.current.value,
      vehicleMakeId: vehicleMakeIdRefContainer.current.value,
    };
    await vehicleModelsStore.editVehicleModel(vehicleModel);
  };

  if (vehicleModelsStore.isEdited) {
    history.push("/vehiclemodels");
  }

  const getVehicleModel = async () => {
    let model = await vehicleModelsStore.getVehicleModel(id);
    await vehicleModelsStore.setVehicleModelToEdit(model);
    abrvRefContainer.current.value = model.abrv;
    nameRefContainer.current.value = model.name;
    vehicleMakeIdRefContainer.current.value =
      vehicleModelsStore.vehicleModelToEditMake.id;
  };
  useEffect(() => {
    getVehicleModel();
  }, []);

  if (vehicleModelsStore.isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <h1>Edit</h1>
      <h4>Vehicle Models</h4>
      <hr />
      <form>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRefContainer}
          className={`${
            vehicleModelsStore.editModelErrror.name ? "error" : null
          }`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${
            vehicleModelsStore.editModelErrror.abrv ? "error" : null
          }`}
          ref={abrvRefContainer}
          defaultValue={vehicleModelsStore.vehicleModelToEdit.abrv}
        />
        <label htmlFor="vehicleMakeId">Make : </label>
        <select
          ref={vehicleMakeIdRefContainer}
          defaultValue={vehicleModelsStore.vehicleModelToEditMake.id}
        >
          {vehicleModelsStore.vehicleMakes.map((vehicleMake) => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.id}>
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
      <div>
        <Link className="back-to-list" to="/vehiclemodels">
          Back to list
        </Link>
      </div>
    </div>
  );
});

export default EditPage;
