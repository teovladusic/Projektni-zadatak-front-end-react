import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class MakeDetailsStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;

  vehicleMakeToSeeDetails = { name: "", abrv: "" };

  setVehicleMakeToSeeDetails(vehicleMake) {
    this.vehicleMakeToSeeDetails = vehicleMake;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  onIdAssigned(id) {
    this.loadVehicleMakeToSeeDetails(id);
  }

  async loadVehicleMakeToSeeDetails(id) {
    let make = await VehicleMakesService.getVehicleMake(id);
    this.setVehicleMakeToSeeDetails(make);
  }
}

export default MakeDetailsStore;
