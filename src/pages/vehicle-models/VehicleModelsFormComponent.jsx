import { observer } from "mobx-react";
import { useRef } from "react";
import { OrderByOptions } from "../../common/Utils";

const VehicleModelsFormComponent = observer(({ vehicleModelsStore }) => {
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
      pageNumber: vehicleModelsStore.params.pageNumber,
    };

    vehicleModelsStore.updateParamsAndLoadVehicleModels(newParams);
  };

  const onNextClicked = () => {
    if (!vehicleModelsStore.pagedVehicleModels.hasNext) return;
    let nextPage = vehicleModelsStore.pagedVehicleModels.currentPage + 1;
    let newParams = { ...vehicleModelsStore.params, pageNumber: nextPage };
    vehicleModelsStore.updateParamsAndLoadVehicleModels(newParams);
  };

  const onPreviousClicked = () => {
    if (!vehicleModelsStore.pagedVehicleModels.hasPrevious) return;
    let prevPage = vehicleModelsStore.pagedVehicleModels.currentPage - 1;
    let newParams = { ...vehicleModelsStore.params, pageNumber: prevPage };
    vehicleModelsStore.updateParamsAndLoadVehicleModels(newParams);
  };

  if (vehicleModelsStore.isLoading) {
    return <></>;
  }
  return (
    <>
      <form className="models-query-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          defaultValue={vehicleModelsStore.params.searchQuery}
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          ref={searchQueryRefContainer}
        />

        <select
          className="select-make"
          defaultValue={vehicleModelsStore.params.makeName}
          id="selectMakeControl"
          name="makeName"
          ref={makeNameRefContainer}
        >
          <option> Select Make</option>
          {vehicleModelsStore.vehicleMakes.map((vehicleMake) => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.name}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>

        <select
          className="order-by-select"
          defaultValue={vehicleModelsStore.params.orderBy}
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
            defaultValue={vehicleModelsStore.params.pageSize}
            ref={pageSizeRefContainer}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          onClick={onPreviousClicked}
          className={`btn btn-default ${
            vehicleModelsStore.pagedVehicleModels.hasPrevious ? "" : "disabled"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNextClicked}
          className={`btn btn-default ${
            vehicleModelsStore.pagedVehicleModels.hasNext ? "" : "disabled"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
});

export default VehicleModelsFormComponent;
