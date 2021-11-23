import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";
import VehicleMakesService from "../../common/VehicleMakesService";

class CreateModelStore {
  constructor() {
    this.loadVehicleMakes();
    makeAutoObservable(this);
  }

  isLoading = false;
  vehicleMakes = [];

  async loadVehicleMakes() {
    let vehicleMakes = await VehicleMakesService.getVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.setVehicleMakes(vehicleMakes.vehicleMakes);
  }

  setVehicleMakes(vehicleMakes) {
    this.vehicleMakes = vehicleMakes;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  createModelError = { name: false, abrv: false };
  isCreated = false;

  setIsCreated(isCreated) {
    this.isCreated = isCreated;
  }

  async createVehicleModel(vehicleModel) {
    this.setIsLoading(true);
    if (vehicleModel.name) {
      this.createModelError = { ...this.createModelError, name: false };
    } else {
      this.createModelError = { ...this.createModelError, name: true };
      this.setIsLoading(false);
      return;
    }

    if (vehicleModel.abrv) {
      this.createModelError = { ...this.createModelError, abrv: false };
    } else {
      this.createModelError = { ...this.createModelError, abrv: true };
      this.setIsLoading(false);
      debugger;
      return;
    }

    await VehicleModelsService.createVehicleModel(vehicleModel);
    this.setIsCreated(true);
  }
}

export default CreateModelStore;
