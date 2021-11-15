import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";
import VehicleMakesService from "../../common/VehicleMakesService";

class EditModelStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleModelToEdit(2);
  }

  isLoading = false;

  editModelErrror = { name: false, abrv: false };
  vehicleModelToEdit = { name: "", abrv: "", makeId: -1 };
  vehicleModelToEditMake = { name: "", abrv: "" };
  isEdited = false;

  vehicleMakes = [];

  async loadVehicleModelToEdit(id) {
    this.setIsLoading(true);
    let model = await VehicleModelsService.getVehicleModel(id);
    await this.loadVehicleMakes();
    this.setVehicleModelToEdit(model);
  }

  async loadVehicleMakes() {
    let vehicleMakes = await VehicleMakesService.getVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.setVehicleMakes(vehicleMakes.vehicleMakes);
    this.setIsLoading(false);
  }

  setVehicleMakes(vehicleMakes) {
    this.vehicleMakes = vehicleMakes;
  }

  setIsEdited(isEdited) {
    this.isEdited = isEdited;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async editVehicleModel(vehicleModel) {
    this.setIsLoading(true);
    if (vehicleModel.name) {
      this.editModelErrror = { ...this.editModelErrror, name: false };
    } else {
      this.editModelErrror = { ...this.editModelErrror, name: true };
      this.setIsLoading(false);
      return;
    }

    if (vehicleModel.abrv) {
      this.editModelErrror = { ...this.editModelErrror, abrv: false };
    } else {
      this.editModelErrror = { ...this.editModelErrror, abrv: true };
      this.setIsLoading(false);
      return;
    }

    await VehicleModelsService.editVehicleModel(vehicleModel);
    this.setIsEdited(true);
  }

  async loadVehicleMakeAndModel(vehicleModel) {
    if (this.vehicleMakes.length === 0) {
      return;
    }
    let id = this.vehicleMakes.filter(
      (make) => make.name === vehicleModel.makeName
    )[0].id;
    let vehicleModelToEditMake = await VehicleMakesService.getVehicleMake(id);
    this.setVehicleModelToEditMake(vehicleModelToEditMake);
    this.setVehicleModelToEdit(vehicleModel);
  }

  setVehicleModelToEdit(model) {
    this.vehicleModelToEdit = model;
  }

  setVehicleModelToEditMake(make) {
    this.vehicleModelToEditMake = make;
  }
}

export default EditModelStore = new EditModelStore();
