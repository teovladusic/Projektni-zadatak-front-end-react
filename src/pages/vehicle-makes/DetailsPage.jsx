import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { inject, observer } from "mobx-react";
import MakeDetailsStore from "./MakeDetailsStore";

const DetailsPage = inject(provider => ({
  makeDetailsStore: new MakeDetailsStore(),
}))(
  observer(props => {
    const { id } = useParams();

    useEffect(() => {
      props.makeDetailsStore.onIdAssigned(id);
    }, [props.makeDetailsStore, id]);

    if (props.makeDetailsStore.isLoading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Details</h1>
        <hr />
        <div className="details-make-body">
          <p className="name-placeholder">Name:</p>
          <p className="name">
            {props.makeDetailsStore.vehicleMakeToSeeDetails.name}
          </p>
          <p className="abrv-placeholder">Abrv:</p>
          <p className="abrv">
            {props.makeDetailsStore.vehicleMakeToSeeDetails.abrv}
          </p>
        </div>

        <Link className="back-to-list" to="/vehiclemakes">
          Back to list
        </Link>
      </div>
    );
  })
);

export default DetailsPage;
