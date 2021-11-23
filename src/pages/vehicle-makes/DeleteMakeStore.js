import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class DeleteMakeStore {
  constructor() {
    makeAutoObservable(this);
  }

  onIdAssigned(id) {
    this.loadVehicleMakeToDelete(id);
  }

  isLoading = false;

  vehicleMakeToDelete = { name: "", abrv: "" };
  isDeleted = false;

  async loadVehicleMakeToDelete(id) {
    let make = await VehicleMakesService.getVehicleMake(id);
    this.setVehicleMakeToDelete(make);
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted;
  }

  setVehicleMakeToDelete(vehicleMake) {
    this.vehicleMakeToDelete = vehicleMake;
  }

  async deleteVehicleMake(id) {
    this.setIsLoading(true);
    try {
      await VehicleMakesService.deleteVehicleMake(id);
    } catch {
      this.setIsLoading(false);
      this.setIsDeleted(true);
    }
  }
}

export default DeleteMakeStore;
