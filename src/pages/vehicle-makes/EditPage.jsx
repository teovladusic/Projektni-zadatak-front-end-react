import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./EditPage.css";
import { inject, observer } from "mobx-react";
import EditMakeStore from "./EditMakeStore";

const EditPage = inject(provider => ({
  editMakeStore: new EditMakeStore(),
}))(
  observer(props => {
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
      props.editMakeStore.onIdAssigned(id);
    }, [props.editMakeStore, id]);

    const refNameContainer = useRef(null);
    const refAbrvContainer = useRef(null);

    const handleSubmit = async e => {
      e.preventDefault();

      let editedVehicleMake = {
        id: id,
        name: refNameContainer.current.value,
        abrv: refAbrvContainer.current.value,
      };

      props.editMakeStore.editVehicleMake(editedVehicleMake);
    };

    if (props.editMakeStore.isEdited) {
      history.push("/vehicleMakes");
    }

    if (props.editMakeStore.isLoading) {
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
            defaultValue={props.editMakeStore.vehicleMakeToEdit.name}
            ref={refNameContainer}
            className={`${
              props.editMakeStore.editMakeError.name ? "error" : null
            }`}
          />
          <label htmlFor="abrv">Abrv : </label>
          <input
            type="text"
            id="abrv"
            name="abrv"
            className={`${
              props.editMakeStore.editMakeError.abrv ? "error" : null
            }`}
            ref={refAbrvContainer}
            defaultValue={props.editMakeStore.vehicleMakeToEdit.abrv}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={e => handleSubmit(e)}
          >
            Save
          </button>
        </form>
        <div>
          <Link to="/vehiclemakes">Back to list</Link>
        </div>
      </div>
    );
  })
);

export default EditPage;
