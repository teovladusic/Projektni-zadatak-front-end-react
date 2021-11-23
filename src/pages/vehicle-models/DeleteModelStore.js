import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";

class DeleteModelStore {
  constructor() {
    makeAutoObservable(this);
  }

  onIdAssigned(id) {
    this.getVehicleModelToDelete(id);
  }

  isLoading = false;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async getVehicleModelToDelete(id) {
    let model = await VehicleModelsService.getVehicleModel(id);
    this.setVehicleModelToDelete(model);
  }

  vehicleModelToDelete = { name: "", abrv: "", makeName: "" };
  isDeleted = false;

  setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted;
  }

  setVehicleModelToDelete(vehicleModel) {
    this.vehicleModelToDelete = vehicleModel;
  }

  async deleteVehicleModel(id) {
    this.setIsLoading(true);
    try {
      await VehicleModelsService.deleteVehicleModel(id);
    } catch {
      this.setIsDeleted(true);
      this.setIsLoading(false);
    }
  }
}

export default DeleteModelStore;
