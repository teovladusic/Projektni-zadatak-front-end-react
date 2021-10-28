import { OrderByOptions } from "../../common/Utils";
import { observer } from "mobx-react";
import { useRef } from "react";

const VehicleMakesFormComponent = observer(({ vehicleMakesStore }) => {
  const searchQueryRefContainer = useRef(null);
  const orderByRefContainer = useRef(null);
  const pageSizeRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newParams = {
      pageNumber: vehicleMakesStore.params.pageNumber,
      searchQuery: searchQueryRefContainer.current.value,
      orderBy: orderByRefContainer.current.value,
      pageSize: pageSizeRefContainer.current.value,
    };
    vehicleMakesStore.updateParamsAndLoadVehicleMakes(newParams);
  };

  const onNextPageClick = async () => {
    if (!vehicleMakesStore.pagedVehicleMakes.hasNext) return;
    let nextPage = vehicleMakesStore.pagedVehicleMakes.currentPage + 1;
    let newParams = { ...vehicleMakesStore.params, pageNumber: nextPage };
    vehicleMakesStore.updateParamsAndLoadVehicleMakes(newParams);
  };

  const onPrevPageClick = async () => {
    if (!vehicleMakesStore.pagedVehicleMakes.hasPrevious) return;
    let prevPage = vehicleMakesStore.pagedVehicleMakes.currentPage - 1;
    let newParams = { ...vehicleMakesStore.params, pageNumber: prevPage };
    vehicleMakesStore.updateParamsAndLoadVehicleMakes(newParams);
  };

  if (vehicleMakesStore.isLoading) {
    return <></>;
  }

  return (
    <div>
      <form className="makes-query-form" onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          ref={searchQueryRefContainer}
          defaultValue={vehicleMakesStore.params.searchQuery}
        />

        <select
          className="order-by-select"
          id="orderByControl"
          name="orderBy"
          ref={orderByRefContainer}
          defaultValue={vehicleMakesStore.params.orderBy}
        >
          <option>Order By</option>
          {OrderByOptions.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>

        <div className="items-per-page">
          <label htmlFor="pageSize">Page Size</label>
          <input
            type="number"
            name="pageSize"
            ref={pageSizeRefContainer}
            defaultValue={vehicleMakesStore.params.pageSize}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          className={`btn btn-default ${
            vehicleMakesStore.pagedVehicleMakes.hasPrevious ? "" : "disabled"
          }`}
          onClick={onPrevPageClick}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${
            vehicleMakesStore.pagedVehicleMakes.hasNext ? "" : "disabled"
          }`}
          onClick={onNextPageClick}
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default VehicleMakesFormComponent;
