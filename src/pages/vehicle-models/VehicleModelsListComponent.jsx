import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import VehicleModelsIndexStore from "../../stores/vehicle-models/VehicleModelsIndexStore";

const VehicleModelsListComponent = observer(() => {
  if (VehicleModelsIndexStore.isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Abrv</th>
          <th>Make Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {VehicleModelsIndexStore.pagedVehicleModels.vehicleModels.map(
          (vehicleModel) => {
            return (
              <tr key={vehicleModel.id}>
                <td>{vehicleModel.name}</td>
                <td>{vehicleModel.abrv}</td>
                <td>{vehicleModel.makeName}</td>
                {
                  <td className="vehiclemodels-links">
                    <Link to={`/vehiclemodels/edit/${vehicleModel.id}`}>
                      Edit
                    </Link>

                    <Link to={`/vehiclemodels/details/${vehicleModel.id}`}>
                      Details
                    </Link>

                    <Link to={`/vehiclemodels/delete/${vehicleModel.id}`}>
                      Delete
                    </Link>
                  </td>
                }
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
});

export default VehicleModelsListComponent;
