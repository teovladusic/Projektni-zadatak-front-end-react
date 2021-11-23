import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class EditMakeStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  onIdAssigned(id) {
    this.loadVehicleMakeToEdit(id);
  }

  async loadVehicleMakeToEdit(id) {
    this.setIsLoading(true);
    let make = await VehicleMakesService.getVehicleMake(id);
    this.setVehicleMakeToEdit(make);
    this.setIsLoading(false);
  }

  editMakeError = { name: false, abrv: false };
  vehicleMakeToEdit = { name: "", abrv: "" };
  isEdited = false;

  setIsEdited(isEdited) {
    this.isEdited = isEdited;
  }

  async editVehicleMake(vehicleMake) {
    if (vehicleMake.name) {
      this.editMakeError = { ...this.editMakeError, name: false };
    } else {
      this.editMakeError = { ...this.editMakeError, name: true };
      return;
    }

    if (vehicleMake.abrv) {
      this.editMakeError = { ...this.editMakeError, abrv: false };
    } else {
      this.editMakeError = { ...this.editMakeError, abrv: true };
      return;
    }

    await VehicleMakesService.editVehicleMake(vehicleMake);
    this.setIsEdited(true);
  }

  setVehicleMakeToEdit(vehicleMake) {
    this.vehicleMakeToEdit = vehicleMake;
  }
}

export default EditMakeStore;
