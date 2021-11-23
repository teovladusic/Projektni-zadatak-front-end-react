import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";
import VehicleMakesService from "../../common/VehicleMakesService";

class VehicleModelsIndexStore {
  constructor() {
    this.loadVehicleModels();
    makeAutoObservable(this);
  }

  params = {
    searchQuery: "",
    pageSize: 10,
    orderBy: "Order By",
    pageNumber: 1,
    makeName: "",
  };

  setParams(params) {
    this.params = params;
  }

  pagedVehicleModels = { vehicleModels: [] };
  isLoading = true;

  vehicleMakes = [];

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setVehicleMakes(vehicleMakes) {
    this.vehicleMakes = vehicleMakes;
  }

  setPagedVehicleModels(pagedVehicleModels) {
    this.pagedVehicleModels = pagedVehicleModels;
  }

  async loadVehicleModels() {
    this.setIsLoading(true);
    let newModels = await VehicleModelsService.getVehicleModels(this.params);
    this.setPagedVehicleModels(newModels);
    let newParams = {
      ...this.params,
      pageSize: this.pagedVehicleModels.pageSize,
    };
    this.setParams(newParams);
    await this.loadVehicleMakes();
    this.setIsLoading(false);
  }

  onPreviousPageClicked() {
    if (!this.pagedVehicleModels.hasPrevious) return;
    let prevPage = this.pagedVehicleModels.currentPage - 1;
    let newParams = { ...this.params, pageNumber: prevPage };
    this.updateParamsAndLoadVehicleModels(newParams);
  }

  onNextPageClicked() {
    if (!this.pagedVehicleModels.hasNext) return;
    let nextPage = this.pagedVehicleModels.currentPage + 1;
    let newParams = { ...this.params, pageNumber: nextPage };
    this.updateParamsAndLoadVehicleModels(newParams);
  }

  updateParamsAndLoadVehicleModels(newParams) {
    if (newParams.makeName === "Select Make") {
      newParams.makeName = "";
    }
    this.params = newParams;
    this.loadVehicleModels(newParams);
  }

  async loadVehicleMakes() {
    let vehicleMakes = await VehicleMakesService.getVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.setVehicleMakes(vehicleMakes.vehicleMakes);
  }
}

export default VehicleModelsIndexStore;
