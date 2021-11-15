import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";
import DeleteModelStore from "../../stores/vehicle-models/DeleteModelStore";

const DeletePage = observer(() => {
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await DeleteModelStore.deleteVehicleModel(
      DeleteModelStore.vehicleModelToDelete.id
    );
  };

  if (DeleteModelStore.isDeleted) {
    DeleteModelStore.setIsDeleted(false);
    history.push("/vehicleModels");
  }

  if (DeleteModelStore.isLoading) {
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
        <p className="name">{DeleteModelStore.vehicleModelToDelete.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{DeleteModelStore.vehicleModelToDelete.abrv}</p>
        <p className="vehicle-make-placeholder">Vehicle Make:</p>
        <p className="vehicle-make">
          {DeleteModelStore.vehicleModelToDelete.makeName}
        </p>

        <button className="btn btn-danger" onClick={handleSubmit}>
          Delete
        </button>
      </div>

      <Link className="back-to-list" to="/vehicleModels">
        Back to list
      </Link>
    </div>
  );
});

export default DeletePage;
