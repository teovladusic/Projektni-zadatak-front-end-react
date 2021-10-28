import { observer } from "mobx-react";
import { useRef } from "react";
import { useHistory } from "react-router";

const CreateMakeFormComponent = observer(({ vehicleMakesStore }) => {
  const history = useHistory();

  const nameRefContainer = useRef(null);
  const abrvRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newMake = {
      name: nameRefContainer.current.value,
      abrv: abrvRefContainer.current.value,
    };

    vehicleMakesStore.createVehicleMake(newMake);
  };

  if (vehicleMakesStore.isCreated) {
    history.push("/vehicleMakes");
    vehicleMakesStore.loadVehicleMakes();
    vehicleMakesStore.isCreated = false;
  }

  return (
    <form className="create-make-form">
      <label id="label-name" htmlFor="name">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        ref={nameRefContainer}
        className={`${vehicleMakesStore.createMakeError.name ? "error" : null}`}
      />

      <label id="label-abrv" htmlFor="abrv">
        Abrv:
      </label>
      <input
        type="text"
        id="abrv"
        name="abrv"
        ref={abrvRefContainer}
        className={`${vehicleMakesStore.createMakeError.abrv ? "error" : null}`}
      />

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
});

export default CreateMakeFormComponent;
