import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";

const DeletePage = observer(({ vehicleModelsStore }) => {
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await vehicleModelsStore.deleteVehicleModel(
      vehicleModelsStore.vehicleModelToDelete.id
    );
  };

  if (vehicleModelsStore.isDeleted) {
    vehicleModelsStore.setIsDeleted(false);
    history.push("/vehicleModels");
  }

  const getvehicleModel = async () => {
    let model = await vehicleModelsStore.getVehicleModel(id);
    vehicleModelsStore.setVehicleModelToDelete(model);
  };
  useEffect(() => {
    getvehicleModel();
  }, []);

  if (vehicleModelsStore.isLoading) {
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
        <p className="name">{vehicleModelsStore.vehicleModelToDelete.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleModelsStore.vehicleModelToDelete.abrv}</p>
        <p className="vehicle-make-placeholder">Vehicle Make:</p>
        <p className="vehicle-make">
          {vehicleModelsStore.vehicleModelToDelete.makeName}
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
