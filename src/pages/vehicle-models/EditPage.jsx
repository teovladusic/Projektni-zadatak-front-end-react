import "bootstrap/dist/css/bootstrap.min.css";
import { observer, inject } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModelStore from "./EditModelStore";

const EditPage = inject(provider => ({
  editModelStore: new EditModelStore(),
}))(
  observer(props => {
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
      props.editModelStore.onIdAssigned(id);
    }, [props.editModelStore, id]);

    const nameRefContainer = useRef(null);
    const abrvRefContainer = useRef(null);
    const vehicleMakeIdRefContainer = useRef(null);

    const handleSubmit = async e => {
      e.preventDefault();

      let vehicleModel = {
        id: id,
        name: nameRefContainer.current.value,
        abrv: abrvRefContainer.current.value,
        vehicleMakeId: vehicleMakeIdRefContainer.current.value,
      };
      await props.editModelStore.editVehicleModel(vehicleModel);
    };

    if (props.editModelStore.isEdited) {
      history.push("/vehiclemodels");
    }

    if (props.editModelStore.isLoading) {
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
            defaultValue={props.editModelStore.vehicleModelToEdit.name}
            className={`${
              props.editModelStore.editModelErrror.name ? "error" : null
            }`}
          />
          <label htmlFor="abrv">Abrv : </label>
          <input
            type="text"
            id="abrv"
            name="abrv"
            className={`${
              props.editModelStore.editModelErrror.abrv ? "error" : null
            }`}
            ref={abrvRefContainer}
            defaultValue={props.editModelStore.vehicleModelToEdit.abrv}
          />
          <label htmlFor="vehicleMakeId">Make : </label>
          <select
            ref={vehicleMakeIdRefContainer}
            defaultValue={props.editModelStore.vehicleModelToEditMake.id}
          >
            {props.editModelStore.vehicleMakes.map(vehicleMake => {
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
            onClick={e => handleSubmit(e)}
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
  })
);

export default EditPage;
