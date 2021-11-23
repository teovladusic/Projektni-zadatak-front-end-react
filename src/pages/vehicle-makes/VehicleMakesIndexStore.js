import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class VehicleMakesIndexStore {
  constructor() {
    this.loadVehicleMakes();
    makeAutoObservable(this);
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

  setParams(params) {
    this.params = params;
  }

  setPagedVehicleMakes(pagedVehicleMakes) {
    this.pagedVehicleMakes = pagedVehicleMakes;
  }

  async updateParamsAndLoadVehicleMakes(params) {
    this.params = params;
    await this.loadVehicleMakes();
  }

  async loadVehicleMakes() {
    this.setIsLoading(true);
    let newMakes = await VehicleMakesService.getVehicleMakes(this.params);
    this.setPagedVehicleMakes(newMakes);
    let newParams = {
      ...this.params,
      pageSize: this.pagedVehicleMakes.pageSize,
    };
    this.setParams(newParams);
    this.setIsLoading(false);
  }
}

export default VehicleMakesIndexStore;
