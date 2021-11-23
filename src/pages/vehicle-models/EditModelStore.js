import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";
import VehicleMakesService from "../../common/VehicleMakesService";

class EditModelStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;

  editModelErrror = { name: false, abrv: false };
  vehicleModelToEdit = { name: "", abrv: "", makeId: -1 };
  vehicleModelToEditMake = { name: "", abrv: "" };
  isEdited = false;

  vehicleMakes = [];

  onIdAssigned(id) {
    this.loadVehicleModelToEdit(id);
  }

  async loadVehicleModelToEdit(id) {
    this.setIsLoading(true);
    let model = await VehicleModelsService.getVehicleModel(id);
    await this.loadVehicleMakes(model.makeName);
    this.setVehicleModelToEdit(model);
  }

  async loadVehicleMakes(makeName) {
    let vehicleMakes = await VehicleMakesService.getVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.setVehicleMakes(vehicleMakes.vehicleMakes);
    await this.loadVehicleMake(vehicleMakes.vehicleMakes, makeName);
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

  async loadVehicleMake(vehicleMakes, makeName) {
    if (vehicleMakes.length === 0) {
      return;
    }

    let id = vehicleMakes.filter(make => make.name === makeName)[0].id;
    let vehicleModelToEditMake = await VehicleMakesService.getVehicleMake(id);

    this.setVehicleModelToEditMake(vehicleModelToEditMake);
  }

  setVehicleModelToEdit(model) {
    this.vehicleModelToEdit = model;
  }

  setVehicleModelToEditMake(make) {
    this.vehicleModelToEditMake = make;
  }
}

export default EditModelStore;
