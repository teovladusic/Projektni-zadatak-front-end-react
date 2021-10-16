import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Index.css";

const url = "https://localhost:44327/VehicleMakes";

export default function Index() {
  const [pagedVehicleMakes, setPagedVehicleMakes] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState({
    searchQuery: "",
    pageSize: 10,
    pageNumber: 1,
    orderBy: "Order By",
  });

  useEffect(() => {
    getVehicleMakes();
  }, []);

  const getVehicleMakes = async () => {
    setIsLoading(true);
    const queryStringParams = `?SearchQuery=${encodeURIComponent(
      params.searchQuery
    )}&PageNumber=${encodeURIComponent(
      params.pageNumber
    )}&PageSize=${encodeURIComponent(
      params.pageSize
    )}&OrderBy=${encodeURIComponent(params.orderBy)}`;

    const response = await fetch(`${url}${queryStringParams}`);

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setPagedVehicleMakes(jsonResponse);
    setParams({ ...params, pageSize: jsonResponse.pageSize });
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setParams({ ...params, [name]: value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getVehicleMakes();
    console.log("submit");
  };

  if (isLoading) {
    return (
      <div className="container">
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>VehicleMakes</h1>
      <Link className="create-link" to="/vehiclemakes/create">
        Create New Make
      </Link>
      <hr />

      <form className="makes-query-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          value={params.searchQuery}
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          onChange={(e) => handleChange(e)}
        />

        <select
          className="order-by-select"
          value={params.orderBy}
          onChange={(e) => handleChange(e)}
          id="orderByControl"
          name="orderBy"
        >
          <option>Order By</option>
          <option>name desc</option>
          <option>name asc</option>
          <option>abrv desc</option>
          <option>abrv asc</option>
        </select>

        <div className="items-per-page">
          <label htmlFor="pageSize">Page Size</label>
          <input
            type="number"
            name="pageSize"
            value={params.pageSize}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-find-makes">
          Submit
        </button>
      </form>

      <div className="next-previous">
        <button
          className={`btn btn-default ${
            pagedVehicleMakes.hasPrevious ? "" : "disabled"
          }`}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${
            pagedVehicleMakes.hasNext ? "" : "disabled"
          }`}
        >
          Next
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Abrv</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pagedVehicleMakes.vehicleMakes.map((vehicleMake) => {
            return (
              <tr key={vehicleMake.id}>
                <td>{vehicleMake.name}</td>
                <td>{vehicleMake.abrv}</td>
                {
                  <td className="vehiclemakes-links">
                    <Link to={`/vehiclemakes/edit/${vehicleMake.id}`}>
                      Edit
                    </Link>

                    <Link to={`/vehiclemakes/details/${vehicleMake.id}`}>
                      Details
                    </Link>

                    <Link to={`/vehiclemakes/delete/${vehicleMake.id}`}>
                      Delete
                    </Link>
                  </td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
