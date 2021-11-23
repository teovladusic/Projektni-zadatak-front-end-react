import "bootstrap/dist/css/bootstrap.min.css";
import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import VehicleModelsIndexStore from "./VehicleModelsIndexStore";
import "./IndexPage.css";
import VehicleModelsFormComponent from "./VehicleModelsFormComponent";
import VehicleModelsListComponent from "./VehicleModelsListComponent";

const IndexPage = inject(provider => ({
  vehicleModelsIndexStore: new VehicleModelsIndexStore(),
}))(
  observer(props => {
    const onNewParams = newParams => {
      props.vehicleModelsIndexStore.updateParamsAndLoadVehicleModels(newParams);
    };

    const onPreviousPageClicked = () => {
      props.vehicleModelsIndexStore.onPreviousPageClicked();
    };

    const onNextPageClicked = () => {
      props.vehicleModelsIndexStore.onNextPageClicked();
    };

    return (
      <div className="container">
        <h1>Vehicle Models</h1>
        <Link className="create-link" to="/vehiclemodels/create">
          Create New Model
        </Link>
        <hr />

        <VehicleModelsFormComponent
          isLoading={props.vehicleModelsIndexStore.isLoading}
          onNewParams={onNewParams}
          params={props.vehicleModelsIndexStore.params}
          vehicleMakes={props.vehicleModelsIndexStore.vehicleMakes}
          onPreviousPageClicked={onPreviousPageClicked}
          hasPrevious={
            props.vehicleModelsIndexStore.pagedVehicleModels.hasPrevious
          }
          hasNext={props.vehicleModelsIndexStore.pagedVehicleModels.hasNext}
          onNextPageClicked={onNextPageClicked}
        />

        <VehicleModelsListComponent
          isLoading={props.vehicleModelsIndexStore.isLoading}
          vehicleModels={
            props.vehicleModelsIndexStore.pagedVehicleModels.vehicleModels
          }
        />
      </div>
    );
  })
);

export default IndexPage;
