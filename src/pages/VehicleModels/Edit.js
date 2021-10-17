import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { GetVehicleMakes } from "../../common/VehicleMakesService";
import {
  EditVehicleModel,
  GetVehicleModel,
} from "../../common/VehicleModelsService";

const Edit = () => {
  const history = useHistory();

  const [vehicleModel, setVehicleModel] = useState();
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [nameError, setNameError] = useState(false);
  const [abrvError, setAbrvError] = useState(false);

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);
  const refVehicleMakeIdContainer = useRef(null);

  const [defaultMakeId, setDefaultMakeId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (refNameContainer.current.value) {
      setNameError(false);
    } else {
      setNameError(true);
      return;
    }

    if (refAbrvContainer.current.value) {
      setAbrvError(false);
    } else {
      setAbrvError(true);
      return;
    }

    let vehicleModel = {
      id: id,
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
      vehicleMakeId: refVehicleMakeIdContainer.current.value,
    };
    await EditVehicleModel(vehicleModel);
    history.push("/vehiclemodels");
  };

  const getVehicleModel = async () => {
    let vehicleModel = await GetVehicleModel(id);
    setVehicleModel(vehicleModel);
    let params = {
      searchQuery: "",
      pageNumber: 1,
      pageSize: 50,
      orderBy: "Order By",
    };
    let makes = await GetVehicleMakes(params);
    setVehicleMakes(makes.vehicleMakes);

    let currentMake = makes.vehicleMakes.filter(
      (make) => make.name === vehicleModel.makeName
    );

    setDefaultMakeId(currentMake[0].id);
    setIsLoading(false);
  };
  useEffect(() => {
    getVehicleModel();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <h1>Edit</h1>
      <h4>Vehicle Models</h4>
      <hr />
      <form>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={refNameContainer}
          defaultValue={vehicleModel.name}
          className={`${nameError ? "error" : null}`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${abrvError ? "error" : null}`}
          ref={refAbrvContainer}
          defaultValue={vehicleModel.abrv}
        />
        <label htmlFor="vehicleMakeId">Make Id : </label>
        <select ref={refVehicleMakeIdContainer} defaultValue={defaultMakeId}>
          {vehicleMakes.map((vehicleMake) => {
            return (
              <option key={vehicleMake.id} value={vehicleMake.id}>
                {vehicleMake.name}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
      <div>
        <Link className="back-to-list" to="/vehiclemodels">
          Back to list
        </Link>
      </div>
    </div>
  );
};

export default Edit;
