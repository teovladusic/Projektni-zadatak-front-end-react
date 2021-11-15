import { OrderByOptions } from "../../common/Utils";
import { inject, observer } from "mobx-react";
import { useRef } from "react";

const VehicleMakesFormComponent = observer(({ store }) => {
  const searchQueryRefContainer = useRef(null);
  const orderByRefContainer = useRef(null);
  const pageSizeRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newParams = {
      pageNumber: store.params.pageNumber,
      searchQuery: searchQueryRefContainer.current.value,
      orderBy: orderByRefContainer.current.value,
      pageSize: pageSizeRefContainer.current.value,
    };
    store.updateParamsAndLoadVehicleMakes(newParams);
  };

  const onNextPageClick = async () => {
    if (!store.pagedVehicleMakes.hasNext) return;
    let nextPage = store.pagedVehicleMakes.currentPage + 1;
    let newParams = {
      ...store.params,
      pageNumber: nextPage,
    };
    store.updateParamsAndLoadVehicleMakes(newParams);
  };

  const onPrevPageClick = async () => {
    if (!store.pagedVehicleMakes.hasPrevious) return;
    let prevPage = store.pagedVehicleMakes.currentPage - 1;
    let newParams = {
      ...store.params,
      pageNumber: prevPage,
    };
    store.updateParamsAndLoadVehicleMakes(newParams);
  };

  if (store.isLoading) {
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
          defaultValue={store.params.searchQuery}
        />

        <select
          className="order-by-select"
          id="orderByControl"
          name="orderBy"
          ref={orderByRefContainer}
          defaultValue={store.params.orderBy}
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
            defaultValue={store.params.pageSize}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          className={`btn btn-default ${
            store.pagedVehicleMakes.hasPrevious ? "" : "disabled"
          }`}
          onClick={onPrevPageClick}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${
            store.pagedVehicleMakes.hasNext ? "" : "disabled"
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
