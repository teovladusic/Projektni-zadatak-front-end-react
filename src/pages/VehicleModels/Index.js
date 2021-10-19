import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Index.css";
import { OrderByOptions } from "../../common/Utils";
import { GetVehicleModels } from "../../common/VehicleModelsService";
import { GetVehicleMakes } from "../../common/VehicleMakesService";

const Index = () => {
  const [vehicleModels, setVehicleModels] = useState({});
  const [vehicleMakes, setVehicleMakes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState({
    searchQuery: "",
    pageSize: 10,
    pageNumber: 1,
    orderBy: "Order By",
    makeName: "Select Make",
  });

  const loadVehicleModels = async () => {
    setIsLoading(true);
    let newParams = params;
    if (params.makeName === "Select Make") {
      newParams.makeName = "";
    }
    let models = await GetVehicleModels(newParams);
    setVehicleModels(models);
    setParams({ ...params, pageSize: models.pageSize });
    let makeParams = {
      searchQuery: "",
      pageNumber: 1,
      pageSize: 50,
      orderBy: "Order By",
    };
    let makes = await GetVehicleMakes(makeParams);
    setVehicleMakes(makes.vehicleMakes);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVehicleModels();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    setParams({ ...params, [name]: value });
  };

  const onNextClicked = () => {
    if (!vehicleModels.hasNext) {
      return;
    }

    let page = params.pageNumber++;
    setParams({ ...params, pageNumber: page });
    loadVehicleModels();
  };

  const onPreviousClicked = () => {
    if (!vehicleModels.hasPrevious) {
      return;
    }
    let page = params.pageNumber--;
    setParams({ ...params, pageNumber: page });
    loadVehicleModels();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadVehicleModels();
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
      <h1>Vehicle Models</h1>
      <Link className="create-link" to="/vehiclemodels/create">
        Create New Model
      </Link>
      <hr />

      <form className="models-query-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          value={params.searchQuery}
          className="search"
          type="text"
          name="searchQuery"
          placeholder="Search.."
          onChange={(e) => handleChange(e)}
        />

        <select
          className="select-make"
          value={params.makeName}
          id="selectMakeControl"
          name="makeName"
          onChange={(e) => handleChange(e)}
        >
          <option> Select Make</option>
          {vehicleMakes.map((vehicleMake) => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.name}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>

        <select
          className="order-by-select"
          value={params.orderBy}
          id="orderByControl"
          name="orderBy"
          onChange={(e) => handleChange(e)}
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
          onClick={onPreviousClicked}
          className={`btn btn-default ${
            vehicleModels.hasPrevious ? "" : "disabled"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNextClicked}
          className={`btn btn-default ${
            vehicleModels.hasNext ? "" : "disabled"
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
            <th>Make Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels.vehicleModels.map((vehicleModel) => {
            return (
              <tr key={vehicleModel.id}>
                <td>{vehicleModel.name}</td>
                <td>{vehicleModel.abrv}</td>
                <td>{vehicleModel.makeName}</td>
                {
                  <td className="vehiclemodels-links">
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
};

export default Index;
