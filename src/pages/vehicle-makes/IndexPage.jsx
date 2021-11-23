import React from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";
import { inject, observer } from "mobx-react";
import VehicleMakesIndexStore from "./VehicleMakesIndexStore";
import VehicleMakesFormComponent from "./VehicleMakesFormComponent";
import VehicleMakesListComponent from "./VehicleMakesListComponent";

const IndexPage = inject(provider => ({
  vehicleMakesIndexStore: new VehicleMakesIndexStore(),
}))(
  observer(props => {
    const onNewParams = newParams => {
      props.vehicleMakesIndexStore.updateParamsAndLoadVehicleMakes(newParams);
    };

    return (
      <div className="container">
        <h1>Vehicle Makes</h1>
        <Link className="create-link" to="/vehiclemakes/create">
          Create New Make
        </Link>
        <hr />
        <VehicleMakesFormComponent
          props={{
            params: props.vehicleMakesIndexStore.params,
            hasNext: props.vehicleMakesIndexStore.pagedVehicleMakes.hasNext,
            hasPrevious:
              props.vehicleMakesIndexStore.pagedVehicleMakes.hasPrevious,
            currentPage:
              props.vehicleMakesIndexStore.pagedVehicleMakes.currentPage,
            isLoading: props.vehicleMakesIndexStore.isLoading,
            onNewParams: onNewParams,
          }}
        />
        <VehicleMakesListComponent
          props={{
            isLoading: props.vehicleMakesIndexStore.isLoading,
            vehicleMakes:
              props.vehicleMakesIndexStore.pagedVehicleMakes.vehicleMakes,
          }}
        />
      </div>
    );
  })
);

export default IndexPage;
