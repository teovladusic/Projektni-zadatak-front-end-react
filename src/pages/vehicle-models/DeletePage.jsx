import "bootstrap/dist/css/bootstrap.min.css";
import { observer, inject } from "mobx-react";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";
import DeleteModelStore from "./DeleteModelStore";

const DeletePage = inject(provider => ({
  deleteModelStore: new DeleteModelStore(),
}))(
  observer(props => {
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
      props.deleteModelStore.onIdAssigned(id);
    }, [props.deleteModelStore, id]);

    const handleSubmit = e => {
      e.preventDefault();

      props.deleteModelStore.deleteVehicleModel(
        props.deleteModelStore.vehicleModelToDelete.id
      );
    };

    if (props.deleteModelStore.isDeleted) {
      history.push("/vehicleModels");
    }

    if (props.deleteModelStore.isLoading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Delete</h1>
        <h3>Are you sure you want to delete this?</h3>
        <hr />

        <div className="delete-model-body">
          <p className="name-placeholder">Name:</p>
          <p className="name">
            {props.deleteModelStore.vehicleModelToDelete.name}
          </p>
          <p className="abrv-placeholder">Abrv:</p>
          <p className="abrv">
            {props.deleteModelStore.vehicleModelToDelete.abrv}
          </p>
          <p className="vehicle-make-placeholder">Vehicle Make:</p>
          <p className="vehicle-make">
            {props.deleteModelStore.vehicleModelToDelete.makeName}
          </p>

          <button className="btn btn-danger" onClick={e => handleSubmit(e)}>
            Delete
          </button>
        </div>

        <Link className="back-to-list" to="/vehicleModels">
          Back to list
        </Link>
      </div>
    );
  })
);

export default DeletePage;
