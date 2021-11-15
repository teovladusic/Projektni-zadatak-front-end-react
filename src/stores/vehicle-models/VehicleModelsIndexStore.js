import { makeAutoObservable } from "mobx";
import VehicleModelsService from "../../common/VehicleModelsService";
import VehicleMakesService from "../../common/VehicleMakesService";

class VehicleModelsIndexStore {
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

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setVehicleMakes(vehicleMakes) {
    this.vehicleMakes = vehicleMakes;
  }

  async loadVehicleModels() {
    console.log("loadVehicleModels");
    this.setIsLoading(true);
    this.pagedVehicleModels = await VehicleModelsService.getVehicleModels(
      this.params
    );
    await this.loadVehicleMakes();
    this.setIsLoading(false);
    console.log("loaded");
  }

  async loadVehicleMakes() {
    console.log("load vehicle makes");
    let vehicleMakes = await VehicleMakesService.getVehicleMakes({
      searchQuery: "",
      pageSize: 50,
      orderBy: "Order By",
      pageNumber: 1,
    });
    this.setVehicleMakes(vehicleMakes.vehicleMakes);
  }

  async updateParamsAndLoadVehicleModels(params) {
    console.log("updateParamsAndLoadVehicleModels");
    if (params.makeName === "Select Make") {
      params.makeName = "";
    }
    this.params = params;
    this.setIsLoading(true);
    await this.loadVehicleModels();
  }

  onPreviousPageClicked() {
    console.log("onPreviousPageClicked");
    if (!this.pagedVehicleModels.hasPrevious) return;
    let prevPage = this.pagedVehicleModels.currentPage - 1;
    let newParams = { ...this.params, pageNumber: prevPage };
    this.updateParamsAndLoadVehicleModels(newParams);
  }

  onNextPageClicked() {
    console.log("onNextPageClicked");
    if (!this.pagedVehicleModels.hasNext) return;
    let nextPage = this.pagedVehicleModels.currentPage + 1;
    let newParams = { ...this.params, pageNumber: nextPage };
    this.updateParamsAndLoadVehicleModels(newParams);
  }
}

export default VehicleModelsIndexStore = new VehicleModelsIndexStore();
