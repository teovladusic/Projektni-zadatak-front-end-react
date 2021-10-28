import {
  CreateVehicleMake,
  DeleteVehicleMake,
  EditVehicleMake,
  GetVehicleMake,
  GetVehicleMakes,
} from "../common/VehicleMakesService";

import { makeAutoObservable } from "mobx";

class VehicleMakesStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleMakes();
  }

  pagedVehicleMakes = { vehicleMakes: [] };
  isLoading = true;

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  params = {
    searchQuery: "",
    pageSize: 10,
    orderBy: "Order By",
    pageNumber: 1,
  };

  async updateParamsAndLoadVehicleMakes(params) {
    this.params = params;
    await this.loadVehicleMakes();
  }

  async loadVehicleMakes() {
    this.setIsLoading(true);
    this.pagedVehicleMakes = await GetVehicleMakes(this.params);
    this.params = { ...this.params, pageSize: this.pagedVehicleMakes.pageSize };
    this.setIsLoading(false);
  }

  createMakeError = { name: false, abrv: false };
  isCreated = false;

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

    await CreateVehicleMake(vehicleMake);
    this.loadVehicleMakes();
    this.isCreated = true;
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

    await EditVehicleMake(vehicleMake);
    this.loadVehicleMakes();
    this.setIsEdited(true);
  }

  setVehicleMakeToEdit(vehicleMake) {
    this.vehicleMakeToEdit = vehicleMake;
  }

  async getVehicleMake(id) {
    this.setIsLoading(true);
    let vehicleMake = GetVehicleMake(id);
    this.setIsLoading(false);
    return vehicleMake;
  }

  vehicleMakeToSeeDetails = { name: "", abrv: "" };

  setVehicleMakeToSeeDetails(vehicleMake) {
    this.vehicleMakeToSeeDetails = vehicleMake;
  }

  vehicleMakeToDelete = { name: "", abrv: "" };
  isDeleted = false;

  setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted;
  }

  setVehicleMakeToDelete(vehicleMake) {
    this.vehicleMakeToDelete = vehicleMake;
  }

  async deleteVehicleMake(id) {
    this.setIsLoading(true);
    try {
      await DeleteVehicleMake(id);
    } catch {
      this.setIsLoading(false);
      this.setIsDeleted(true);
      this.loadVehicleMakes();
    }
  }
}

export default VehicleMakesStore = new VehicleMakesStore();
