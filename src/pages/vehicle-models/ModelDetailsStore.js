import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";

class ModelDetailsStore {
  constructor() {
    makeAutoObservable(this);
  }

  onIdAssigned(id) {
    this.loadVehicleModelToSeeDetails(id);
  }

  async loadVehicleModelToSeeDetails(id) {
    let model = await VehicleModelsService.getVehicleModel(id);
    this.setVehicleModelToSeeDetails(model);
  }

  isLoading = true;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  vehicleModelToSeeDetails = { name: "", abrv: "", makeName: "" };

  setVehicleModelToSeeDetails(vehicleModel) {
    this.vehicleModelToSeeDetails = vehicleModel;
    this.setIsLoading(false);
  }
}

export default ModelDetailsStore;
