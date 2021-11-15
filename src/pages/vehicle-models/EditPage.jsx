import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModelStore from "../../stores/vehicle-models/EditModelStore";

const EditPage = observer(() => {
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
    await EditModelStore.editVehicleModel(vehicleModel);
  };

  if (EditModelStore.isEdited) {
    history.push("/vehiclemodels");
  }

  if (EditModelStore.isLoading) {
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
          defaultValue={EditModelStore.vehicleModelToEdit.name}
          className={`${EditModelStore.editModelErrror.name ? "error" : null}`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${EditModelStore.editModelErrror.abrv ? "error" : null}`}
          ref={abrvRefContainer}
          defaultValue={EditModelStore.vehicleModelToEdit.abrv}
        />
        <label htmlFor="vehicleMakeId">Make : </label>
        <select
          ref={vehicleMakeIdRefContainer}
          defaultValue={EditModelStore.vehicleModelToEditMake.id}
        >
          {EditModelStore.vehicleMakes.map((vehicleMake) => {
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
