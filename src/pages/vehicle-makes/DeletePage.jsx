import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";
import { observer } from "mobx-react";

const DeletePage = observer(({ vehicleMakesStore }) => {
  const history = useHistory();
  const { id } = useParams();

  const loadVehicleMake = async () => {
    let make = await vehicleMakesStore.getVehicleMake(id);
    vehicleMakesStore.setVehicleMakeToDelete(make);
  };

  useEffect(() => {
    loadVehicleMake();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleMakesStore.deleteVehicleMake(id);
  };

  if (vehicleMakesStore.isDeleted) {
    vehicleMakesStore.isDeleted = false;
    history.push("/vehicleMakes");
  }

  if (vehicleMakesStore.isLoading) {
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
        <p className="name">{vehicleMakesStore.vehicleMakeToDelete.name}</p>
        <p className="abrv-placeholder">Abrv:</p>
        <p className="abrv">{vehicleMakesStore.vehicleMakeToDelete.abrv}</p>

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
