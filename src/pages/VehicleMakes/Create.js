import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import "./Create.css";
import { useHistory } from "react-router";
import { CreateVehicleMake } from "../../common/VehicleMakesService";

const Create = () => {
  const history = useHistory();

  const refNameContainer = useRef(null);
  const refAbrvContainer = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [abrvError, setAbrvError] = useState(false);

  useEffect(() => {
    refNameContainer.current.focus();
  });

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

    await CreateVehicleMake({
      name: refNameContainer.current.value,
      abrv: refAbrvContainer.current.value,
    });
    history.push("/vehicleMakes");
  };
  return (
    <div className="container">
      <h1>Create</h1>
      <h4>Vehicle Make</h4>
      <hr />

      <form className="create-make-form">
        <label id="label-name" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={refNameContainer}
          className={`${nameError ? "error" : null}`}
        />

        <label id="label-abrv" htmlFor="abrv">
          Abrv:
        </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          ref={refAbrvContainer}
          className={`${abrvError ? "error" : null}`}
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Create;
