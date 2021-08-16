import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const url = "https://localhost:44327/Vehiclemodels";
const vehicleMakesUrl = "https://localhost:44327/Vehiclemakes";

export default function Index() {
  const [pagedVehicleModels, setPagedVehicleModels] = useState({
    vehicleModels: [],
    currentPage: 1,
    hasNext: false,
    hasPrevious: false,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const [vehicleMakes, setVehicleMakes] = useState([]);

  const query = new URLSearchParams(useLocation().search);

  const [params, setParams] = useState({
    searchQuery: "",
    pageSize: 10,
    pageNumber: query.get("pageNumber") && 1,
  });

  useEffect(() => {
    getVehicleModels();
    getAllVehicleMakes();
    params.searchQuery = query.get("searchQuery");
    params.pageSize = query.get("pageSize");

    const orderBy = query.get("orderBy");
    document.getElementById("orderByControl").value = orderBy
      ? orderBy
      : "Order By";
  }, []);

  const getAllVehicleMakes = async () => {
    const response = await fetch(vehicleMakesUrl);
    const jsonResponse = await response.json();
    console.log("jsonResponse " + jsonResponse);
    setVehicleMakes(jsonResponse.vehicleMakes);
    const makeName = query.get("makeName");
    document.getElementById("makeNameControl").value = makeName
      ? makeName
      : "Make Name";
  };

  const getVehicleModels = async () => {
    const searchQuery = query.get("searchQuery") || "";
    const pageNumber = query.get("pageNumber") || 1;
    const pageSize = query.get("pageSize") || 10;
    const orderBy = query.get("orderBy") || "Order By";
    const makeName = query.get("makeName") || "Make Name";

    const queryStringParams = `?SearchQuery=${encodeURIComponent(
      searchQuery
    )}&PageNumber=${encodeURIComponent(
      pageNumber
    )}&PageSize=${encodeURIComponent(pageSize)}&OrderBy=${encodeURIComponent(
      orderBy
    )}&MakeName=${encodeURIComponent(makeName)}`;
    const response = await fetch(`${url}${queryStringParams}`);

    const jsonResponse = await response.json();

    setPagedVehicleModels(jsonResponse);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setParams({ ...params, [name]: value });
  };

  return (
    <div className="container">
      <h1>Vehiclemodels</h1>
      <Link to="/vehiclemodels/create">Create</Link>

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
        <div className="form-group">
          <label>Order by</label>
          <select className="form-control" id="makeNameControl" name="makeName">
            <option>Make Name</option>
            {vehicleMakes.map((vehicleMake) => {
              return <option key={vehicleMake.id}>{vehicleMake.name}</option>;
            })}
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
            pagedVehicleModels.hasPrevious ? "" : "disabled"
          }`}
          name="pageNumber"
          value={pagedVehicleModels.currentPage - 1}
        >
          Previous
        </button>
        <button
          className={`btn btn-default ${
            pagedVehicleModels.hasNext ? "" : "disabled"
          }`}
          name="pageNumber"
          value={pagedVehicleModels.currentPage + 1}
        >
          Next
        </button>
      </form>
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
          {pagedVehicleModels.vehicleModels.map((vehicleModel) => {
            return (
              <tr key={vehicleModel.id}>
                <td>{vehicleModel.name}</td>
                <td>{vehicleModel.abrv}</td>
                <td>{vehicleModel.makeName}</td>
                {
                  <td>
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
          })}
        </tbody>
      </table>
    </div>
  );
}
