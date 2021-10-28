import { makeAutoObservable } from "mobx";
import { GetVehicleMake, GetVehicleMakes } from "../common/VehicleMakesService";
import {
  GetVehicleModels,
  EditVehicleModel,
  GetVehicleModel,
  DeleteVehicleModel,
  CreateVehicleModel,
} from "../common/VehicleModelsService";

class VehicleModelsStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleModels();
  }

  pagedVehicleModels = { vehicleModels: [] };
  isLoading = true;

  vehicleMakes = [];

  params = {
    searchQuery: "",
    pageSize: 10,
    orderBy: "Order By",
    pageNumber: 1,
    makeName: "",
  };

  async loadVehicleModels() {
    this.isLoading = true;
    this.pagedVehicleModels = await GetVehicleModels(this.params);
    let vehicleMakes = await GetVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.vehicleMakes = vehicleMakes.vehicleMakes;
    this.isLoading = false;
  }

  async updateParamsAndLoadVehicleModels(params) {
    if (params.makeName === "Select Make") {
      params.makeName = "";
    }
    this.params = params;
    this.isLoading = true;
    await this.loadVehicleModels();
  }

  editModelErrror = { name: false, abrv: false };
  vehicleModelToEdit = { name: "", abrv: "", makeId: -1 };
  vehicleModelToEditMake = { name: "", abrv: "" };
  isEdited = false;

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

    await EditVehicleModel(vehicleModel);
    this.loadVehicleModels();
    this.setIsEdited(true);
  }

  async setVehicleModelToEdit(vehicleModel) {
    let id = this.vehicleMakes.filter(
      (make) => make.name === vehicleModel.makeName
    )[0].id;
    this.vehicleModelToEditMake = await GetVehicleMake(id);
    this.vehicleModelToEdit = vehicleModel;
  }

  async getVehicleModel(id) {
    this.setIsLoading(true);
    let vehicleModel = GetVehicleModel(id);
    this.setIsLoading(false);
    return vehicleModel;
  }

  vehicleModelToSeeDetails = { name: "", abrv: "", makeName: "" };

  setVehicleModelToSeeDetails(vehicleModel) {
    this.vehicleModelToSeeDetails = vehicleModel;
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
      await DeleteVehicleModel(id);
    } catch {
      this.setIsLoading(false);
      this.setIsDeleted(true);
      this.loadVehicleModels();
    }
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
      return;
    }

    await CreateVehicleModel(vehicleModel);
    this.loadVehicleModels();
    this.isCreated = true;
  }
}

export default VehicleModelsStore = new VehicleModelsStore();
