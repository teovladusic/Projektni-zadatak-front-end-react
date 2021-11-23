import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./DeletePage.css";
import { inject, observer } from "mobx-react";
import DeleteMakeStore from "./DeleteMakeStore";

const DeletePage = inject(provider => ({
  deleteMakeStore: new DeleteMakeStore(),
}))(
  observer(props => {
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
      props.deleteMakeStore.onIdAssigned(id);
    }, [props.deleteMakeStore, id]);

    const handleSubmit = async e => {
      e.preventDefault();
      await props.deleteMakeStore.deleteVehicleMake(id);
    };

    if (props.deleteMakeStore.isDeleted) {
      history.push("/vehicleMakes");
    }

    if (props.deleteMakeStore.isLoading) {
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
          <p className="name">
            {props.deleteMakeStore.vehicleMakeToDelete.name}
          </p>
          <p className="abrv-placeholder">Abrv:</p>
          <p className="abrv">
            {props.deleteMakeStore.vehicleMakeToDelete.abrv}
          </p>

          <button className="btn btn-danger" onClick={handleSubmit}>
            Delete
          </button>
        </div>

        <Link className="back-to-list" to="/vehiclemakes">
          Back to list
        </Link>
      </div>
    );
  })
);

export default DeletePage;
