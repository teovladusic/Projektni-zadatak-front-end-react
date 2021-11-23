import { OrderByOptions } from "../../common/Utils";
import { observer } from "mobx-react";
import { useRef } from "react";

const VehicleMakesFormComponent = observer(({ props }) => {
  const searchQueryRefContainer = useRef(null);
  const orderByRefContainer = useRef(null);
  const pageSizeRefContainer = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    let newParams = {
      pageNumber: props.params.pageNumber,
      searchQuery: searchQueryRefContainer.current.value,
      orderBy: orderByRefContainer.current.value,
      pageSize: pageSizeRefContainer.current.value,
    };
    props.onNewParams(newParams);
  };

  const onNextPageClick = async () => {
    if (!props.hasNext) return;
    let nextPage = props.currentPage + 1;
    let newParams = {
      ...props.params,
      pageNumber: nextPage,
    };
    props.onNewParams(newParams);
  };

  const onPrevPageClick = async () => {
    if (!props.hasPrevious) return;
    let prevPage = props.currentPage - 1;
    let newParams = {
      ...props.params,
      pageNumber: prevPage,
    };
    props.onNewParams(newParams);
  };

  if (props.isLoading) {
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
          defaultValue={props.params.searchQuery}
        />

        <select
          className="order-by-select"
          id="orderByControl"
          name="orderBy"
          ref={orderByRefContainer}
          defaultValue={props.params.orderBy}
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
            defaultValue={props.params.pageSize}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          className={`btn btn-default ${props.hasPrevious ? "" : "disabled"}`}
          onClick={onPrevPageClick}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${props.hasNext ? "" : "disabled"}`}
          onClick={onNextPageClick}
        >
          Next
        </button>
      </div>
    </div>
  );
});
export default VehicleMakesFormComponent;
