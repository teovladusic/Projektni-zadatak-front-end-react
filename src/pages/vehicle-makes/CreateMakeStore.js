import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class CreateMakeStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  createMakeError = { name: false, abrv: false };
  isCreated = false;

  setIsCreated(isCreated) {
    this.isCreated = isCreated;
  }

  async createVehicleMake(vehicleMake) {
    this.setIsLoading(true);
    if (vehicleMake.name) {
      this.createMakeError = { ...this.createMakeError, name: false };
    } else {
      this.createMakeError = { ...this.createMakeError, name: true };
      this.setIsLoading(false);
      return;
    }

    if (vehicleMake.abrv) {
      this.createMakeError = { ...this.createMakeError, abrv: false };
    } else {
      this.createMakeError = { ...this.createMakeError, abrv: true };
      this.setIsLoading(false);
      return;
    }

    await VehicleMakesService.createVehicleMake(vehicleMake);
    this.setIsCreated(true);
  }
}

export default CreateMakeStore;
