import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePage.css";
import CreateMakeFormComponent from "./CreateMakeFormComponent";

const CreatePage = () => {
  return (
    <div className="container">
      <h1>Create</h1>
      <h4>Vehicle Make</h4>
      <hr />
      <CreateMakeFormComponent />
    </div>
  );
};

export default CreatePage;
