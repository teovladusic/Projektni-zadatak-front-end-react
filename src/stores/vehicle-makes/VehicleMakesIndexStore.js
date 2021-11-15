import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class VehicleMakesIndexStore {
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
    this.pagedVehicleMakes = await VehicleMakesService.getVehicleMakes(
      this.params
    );
    this.params = { ...this.params, pageSize: this.pagedVehicleMakes.pageSize };
    this.setIsLoading(false);
  }
}

export default VehicleMakesIndexStore = VehicleMakesIndexStore;
