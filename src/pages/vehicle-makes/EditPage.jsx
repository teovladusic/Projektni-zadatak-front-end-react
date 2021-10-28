import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./EditPage.css";
import { observer } from "mobx-react";

const EditPage = observer(({ vehicleMakesStore }) => {
  const history = useHistory();

  const { id } = useParams();

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedVehicleMake = {
      id: id,
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
    };

    vehicleMakesStore.editVehicleMake(editedVehicleMake);
  };

  if (vehicleMakesStore.isEdited) {
    vehicleMakesStore.isEdited = false;
    history.push("/vehicleMakes");
  }

  const loadMake = async () => {
    let make = await vehicleMakesStore.getVehicleMake(id);
    vehicleMakesStore.setVehicleMakeToEdit(make);
    refNameContainer.current.value = make.name;
    refAbrvContainer.current.value = make.abrv;
  };

  useEffect(() => {
    loadMake();
  }, []);

  if (vehicleMakesStore.isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Edit</h1>
      <h4>Vehicle Makes</h4>
      <hr />
      <form>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={refNameContainer}
          className={`${vehicleMakesStore.editMakeError.name ? "error" : null}`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${vehicleMakesStore.editMakeError.abrv ? "error" : null}`}
          ref={refAbrvContainer}
          defaultValue={vehicleMakesStore.vehicleMakeToEdit.abrv}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
      <div>
        <Link to="/vehiclemakes">Back to list</Link>
      </div>
    </div>
  );
});

export default EditPage;
