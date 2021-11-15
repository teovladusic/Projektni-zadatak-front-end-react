import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class EditMakeStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleMakeToEdit();
  }

  async loadVehicleMakeToEdit() {
    let make = await VehicleMakesService.getVehicleMake(2);
    this.setVehicleMakeToEdit(make);
  }

  isLoading = true;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  editMakeError = { name: false, abrv: false };
  vehicleMakeToEdit = { name: "", abrv: "" };
  isEdited = false;

  setIsEdited(isEdited) {
    this.isEdited = isEdited;
  }

  async editVehicleMake(vehicleMake) {
    this.setIsLoading(true);
    if (vehicleMake.name) {
      this.editMakeError = { ...this.editMakeError, name: false };
    } else {
      this.editMakeError = { ...this.editMakeError, name: true };
      this.setIsLoading(false);
      return;
    }

    if (vehicleMake.abrv) {
      this.editMakeError = { ...this.editMakeError, abrv: false };
    } else {
      this.editMakeError = { ...this.editMakeError, abrv: true };
      this.setIsLoading(false);
      return;
    }

    await VehicleMakesService.editVehicleMake(vehicleMake);
    this.setIsEdited(true);
  }

  setVehicleMakeToEdit(vehicleMake) {
    this.vehicleMakeToEdit = vehicleMake;
    console.log(this.vehicleMakeToEdit);
    this.setIsLoading(false);
  }
}

export default EditMakeStore = new EditMakeStore();
