import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const url = "https://localhost:44327/VehicleMakes";

export default function Index() {
  const [pagedVehicleMakes, setPagedVehicleMakes] = useState({
    vehicleMakes: [],
    currentPage: 1,
    hasNext: false,
    hasPrevious: false,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const query = new URLSearchParams(useLocation().search);

  const [params, setParams] = useState({
    searchQuery: "",
    pageSize: 10,
    pageNumber: query.get("pageNumber") && 1,
  });

  useEffect(() => {
    getVehicleMakes();
    params.searchQuery = query.get("searchQuery");
    params.pageSize = query.get("pageSize");
    const orderBy = query.get("orderBy");
    document.getElementById("orderByControl").value = orderBy
      ? orderBy
      : "Order By";
  }, []);

  const getVehicleMakes = async () => {
    const searchQuery = query.get("searchQuery") || "";
    const pageNumber = query.get("pageNumber") || 1;
    const pageSize = query.get("pageSize") || 10;
    const orderBy = query.get("orderBy") || "Order By";

    const queryStringParams = `?SearchQuery=${encodeURIComponent(
      searchQuery
    )}&PageNumber=${encodeURIComponent(
      pageNumber
    )}&PageSize=${encodeURIComponent(pageSize)}&OrderBy=${encodeURIComponent(
      orderBy
    )}`;
    const response = await fetch(`${url}${queryStringParams}`);

    const jsonResponse = await response.json();

    setPagedVehicleMakes(jsonResponse);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setParams({ ...params, [name]: value });
  };

  return (
    <div className="container">
      <h1>VehicleMakes</h1>
      <Link to="/vehiclemakes/create">Create</Link>

      <form method="get">
        <div className="form-outline">
          <p>
            Search:{" "}
            <input
              type="text"
              name="searchQuery"
              value={params.searchQuery}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="form-group">
          <label for="orderByControl">Order by</label>
          <select className="form-control" id="orderByControl" name="orderBy">
            <option>Order By</option>
            <option>name desc</option>
            <option>name asc</option>
            <option>abrv desc</option>
            <option>abrv asc</option>
          </select>
        </div>
        <p>
          Items per page:{" "}
          <input
            type="number"
            name="pageSize"
            value={params.pageSize}
            onChange={handleChange}
          />
        </p>
        <button type="submit" value="Search" className="btn btn-primary">
          Submit
        </button>
        <button
          className={`btn btn-default ${
            pagedVehicleMakes.hasPrevious ? "" : "disabled"
          }`}
          name="pageNumber"
          value={pagedVehicleMakes.currentPage - 1}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${
            pagedVehicleMakes.hasNext ? "" : "disabled"
          }`}
          name="pageNumber"
          //ovo ti sad stvara string ti i onda kad ti je prva stranica i stisnes next bude ti 11
          value={pagedVehicleMakes.currentPage + 1}
        >
          Next
        </button>
      </form>
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
                  <td>
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
