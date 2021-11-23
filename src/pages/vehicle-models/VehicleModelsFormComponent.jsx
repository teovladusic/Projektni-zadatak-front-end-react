import { observer } from "mobx-react";
import { useRef } from "react";
import { OrderByOptions } from "../../common/Utils";

const VehicleModelsFormComponent = observer(props => {
  const searchQueryRefContainer = useRef(null);
  const orderByRefContainer = useRef(null);
  const pageSizeRefContainer = useRef(null);
  const makeNameRefContainer = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    let newParams = {
      searchQuery: searchQueryRefContainer.current.value,
      orderBy: orderByRefContainer.current.value,
      makeName: makeNameRefContainer.current.value,
      pageSize: pageSizeRefContainer.current.value,
      pageNumber: props.params.pageNumber,
    };
    props.onNewParams(newParams);
  };

  if (props.isLoading) {
    return <></>;
  }
  return (
    <>
      <form className="models-query-form" onSubmit={e => handleSubmit(e)}>
        <input
          defaultValue={props.params.searchQuery}
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          ref={searchQueryRefContainer}
        />

        <select
          className="select-make"
          defaultValue={props.params.makeName}
          id="selectMakeControl"
          name="makeName"
          ref={makeNameRefContainer}
        >
          <option> Select Make</option>
          {props.vehicleMakes.map(vehicleMake => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.name}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>

        <select
          className="order-by-select"
          defaultValue={props.params.orderBy}
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
            defaultValue={props.params.pageSize}
            ref={pageSizeRefContainer}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          onClick={() => props.onPreviousPageClicked()}
          className={`btn btn-default ${props.hasPrevious ? "" : "disabled"}`}
        >
          Previous
        </button>
        <button
          onClick={() => props.onNextPageClicked()}
          className={`btn btn-default ${props.hasNext ? "" : "disabled"}`}
        >
          Next
        </button>
      </div>
    </>
  );
});

export default VehicleModelsFormComponent;
