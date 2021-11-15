import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";

class DeleteModelStore {
  constructor() {
    makeAutoObservable(this);
    this.getVehicleModelToDelete(2);
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
      this.setIsLoading(false);
      this.setIsDeleted(true);
    }
  }
}

export default DeleteModelStore = new DeleteModelStore();
