import { observer } from "mobx-react";
import { useRef } from "react";
import { useHistory } from "react-router";
import CreateMakeStore from "../../stores/vehicle-makes/CreateMakeStore";

const CreateMakeFormComponent = observer(() => {
  const history = useHistory();

  const nameRefContainer = useRef(null);
  const abrvRefContainer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newMake = {
      name: nameRefContainer.current.value,
      abrv: abrvRefContainer.current.value,
    };

    CreateMakeStore.createVehicleMake(newMake);
  };

  if (CreateMakeStore.isCreated) {
    history.push("/vehicleMakes");
    CreateMakeStore.isCreated = false;
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
        className={`${CreateMakeStore.createMakeError.name ? "error" : null}`}
      />

      <label id="label-abrv" htmlFor="abrv">
        Abrv:
      </label>
      <input
        type="text"
        id="abrv"
        name="abrv"
        ref={abrvRefContainer}
        className={`${CreateMakeStore.createMakeError.abrv ? "error" : null}`}
      />

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
});

export default CreateMakeFormComponent;
