import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";
import { observer } from "mobx-react";
import DeleteMakeStore from "../../stores/vehicle-makes/DeleteMakeStore";

const DeletePage = observer(() => {
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await DeleteMakeStore.deleteVehicleMake(id);
  };

  if (DeleteMakeStore.isDeleted) {
    DeleteMakeStore.isDeleted = false;
    history.push("/vehicleMakes");
  }

  if (DeleteMakeStore.isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Delete</h1>
      <h3>
        Are you sure you want to delete this (all models that <br />
        are related to this make will be deleted)?
      </h3>
      <hr />

      <div className="delete-make-body">
        <p className="name-placeholder">Name:</p>
        <p className="name">{DeleteMakeStore.vehicleMakeToDelete.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{DeleteMakeStore.vehicleMakeToDelete.abrv}</p>

        <button className="btn btn-danger" onClick={handleSubmit}>
          Delete
        </button>
      </div>

      <Link className="back-to-list" to="/vehiclemakes">
        Back to list
      </Link>
    </div>
  );
});

export default DeletePage;
