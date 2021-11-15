import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class DeleteMakeStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleMakeToDelete();
  }

  vehicleMakeToDelete = { name: "", abrv: "" };
  isDeleted = false;

  async loadVehicleMakeToDelete() {
    let make = await VehicleMakesService.getVehicleMake(2);
    this.setVehicleMakeToDelete(make);
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
      this.loadVehicleMakes();
    }
  }
}

export default DeleteMakeStore = new DeleteMakeStore();
