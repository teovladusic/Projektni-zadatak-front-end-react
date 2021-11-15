import { observer } from "mobx-react";
import { useRef } from "react";
import { OrderByOptions } from "../../common/Utils";
import VehicleModelsIndexStore from "../../stores/vehicle-models/VehicleModelsIndexStore";

const VehicleModelsFormComponent = observer(() => {
  const searchQueryRefContainer = useRef(null);
  const orderByRefContainer = useRef(null);
  const pageSizeRefContainer = useRef(null);
  const makeNameRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newParams = {
      searchQuery: searchQueryRefContainer.current.value,
      orderBy: orderByRefContainer.current.value,
      makeName: makeNameRefContainer.current.value,
      pageSize: pageSizeRefContainer.current.value,
      pageNumber: VehicleModelsIndexStore.params.pageNumber,
    };

    VehicleModelsIndexStore.updateParamsAndLoadVehicleModels(newParams);
  };

  if (VehicleModelsIndexStore.isLoading) {
    return <></>;
  }
  return (
    <>
      <form className="models-query-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          defaultValue={VehicleModelsIndexStore.params.searchQuery}
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          ref={searchQueryRefContainer}
        />

        <select
          className="select-make"
          defaultValue={VehicleModelsIndexStore.params.makeName}
          id="selectMakeControl"
          name="makeName"
          ref={makeNameRefContainer}
        >
          <option> Select Make</option>
          {VehicleModelsIndexStore.vehicleMakes.map((vehicleMake) => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.name}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>

        <select
          className="order-by-select"
          defaultValue={VehicleModelsIndexStore.params.orderBy}
          id="orderByControl"
          name="orderBy"
          ref={orderByRefContainer}
        >
          <option>Order By</option>
          {OrderByOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>

        <div className="items-per-page">
          <label htmlFor="pageSize">Page Size</label>
          <input
            type="number"
            name="pageSize"
            defaultValue={VehicleModelsIndexStore.params.pageSize}
            ref={pageSizeRefContainer}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          onClick={() => VehicleModelsIndexStore.onPreviousPageClicked()}
          className={`btn btn-default ${
            VehicleModelsIndexStore.pagedVehicleModels.hasPrevious
              ? ""
              : "disabled"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => VehicleModelsIndexStore.onNextPageClicked()}
          className={`btn btn-default ${
            VehicleModelsIndexStore.pagedVehicleModels.hasNext ? "" : "disabled"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
});

export default VehicleModelsFormComponent;
