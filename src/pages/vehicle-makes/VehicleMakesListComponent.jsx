import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const VehicleMakesListComponent = observer(({ vehicleMakesStore }) => {
  if (vehicleMakesStore.isLoading) {
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {vehicleMakesStore.pagedVehicleMakes.vehicleMakes.map((vehicleMake) => {
          return (
            <tr key={vehicleMake.id}>
              <td>{vehicleMake.name}</td>
              <td>{vehicleMake.abrv}</td>
              {
                <td className="vehiclemakes-links">
                  <Link
                    to={`/vehiclemakes/edit/${vehicleMake.id}`}
                    vehicleMakesStore={vehicleMakesStore}
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/vehiclemakes/details/${vehicleMake.id}`}
                    vehicleMakesStore={vehicleMakesStore}
                  >
                    Details
                  </Link>

                  <Link
                    to={`/vehiclemakes/delete/${vehicleMake.id}`}
                    vehicleMakesStore={vehicleMakesStore}
                  >
                    Delete
                  </Link>
                </td>
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default VehicleMakesListComponent;
