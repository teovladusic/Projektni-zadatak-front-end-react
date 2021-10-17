import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./Edit.css";
import {
  GetVehicleMake,
  EditVehicleMake,
} from "../../common/VehicleMakesService";

const Edit = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleMake, setVehicleMake] = useState();
  const { id } = useParams();
  const [nameError, setNameError] = useState(false);
  const [abrvError, setAbrvError] = useState(false);
  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);

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
    let editedVehicleMake = {
      id: id,
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
    };

    await EditVehicleMake(editedVehicleMake);
    history.push("/vehicleMakes");
  };

  const getVehicleMake = async () => {
    setIsLoading(true);
    const response = await GetVehicleMake(id);
    setVehicleMake(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getVehicleMake();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <h1>Edit</h1>
      <h4>Vehicle Makes</h4>
      <hr />
      <form>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={refNameContainer}
          defaultValue={vehicleMake.name}
          className={`${nameError ? "error" : null}`}
        />
        <label htmlFor="abrv">Abrv : </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          className={`${abrvError ? "error" : null}`}
          ref={refAbrvContainer}
          defaultValue={vehicleMake.abrv}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
      <div>
        <Link to="/vehiclemakes">Back to list</Link>
      </div>
    </div>
  );
};

export default Edit;
