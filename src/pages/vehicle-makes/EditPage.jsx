import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./EditPage.css";
import { observer } from "mobx-react";
import EditMakeStore from "../../stores/vehicle-makes/EditMakeStore";

const EditPage = observer(() => {
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

    EditMakeStore.editVehicleMake(editedVehicleMake);
  };

  if (EditMakeStore.isEdited) {
    EditMakeStore.isEdited = false;
    history.push("/vehicleMakes");
  }

  if (EditMakeStore.isLoading) {
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
          defaultValue={EditMakeStore.vehicleMakeToEdit.name}
          ref={refNameContainer}
          className={`${EditMakeStore.editMakeError.name ? "error" : null}`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${EditMakeStore.editMakeError.abrv ? "error" : null}`}
          ref={refAbrvContainer}
          defaultValue={EditMakeStore.vehicleMakeToEdit.abrv}
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
