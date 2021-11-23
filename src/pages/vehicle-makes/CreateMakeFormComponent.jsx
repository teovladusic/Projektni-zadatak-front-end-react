import { inject, observer } from "mobx-react";
import { useRef } from "react";
import { useHistory } from "react-router";
import CreateMakeStore from "./CreateMakeStore";

const CreateMakeFormComponent = inject(provider => ({
  createMakeStore: new CreateMakeStore(),
}))(
  observer(props => {
    const history = useHistory();

    const nameRefContainer = useRef(null);
    const abrvRefContainer = useRef(null);

    const handleSubmit = async e => {
      e.preventDefault();
      let newMake = {
        name: nameRefContainer.current.value,
        abrv: abrvRefContainer.current.value,
      };

      props.createMakeStore.createVehicleMake(newMake);
    };

    if (props.createMakeStore.isCreated) {
      history.push("/vehicleMakes");
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
          className={`${
            props.createMakeStore.createMakeError.name ? "error" : null
          }`}
        />

        <label id="label-abrv" htmlFor="abrv">
          Abrv:
        </label>
        <input
          type="text"
          id="abrv"
          name="abrv"
          ref={abrvRefContainer}
          className={`${
            props.createMakeStore.createMakeError.abrv ? "error" : null
          }`}
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => handleSubmit(e)}
        >
          Save
        </button>
      </form>
    );
  })
);

export default CreateMakeFormComponent;
