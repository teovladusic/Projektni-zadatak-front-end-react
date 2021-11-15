import { makeAutoObservable } from "mobx";
import VehicleMakesService from "../../common/VehicleMakesService";

class MakeDetailsStore {
  constructor() {
    makeAutoObservable(this);
    this.loadVehicleMakeToSeeDetails();
  }

  async loadVehicleMakeToSeeDetails() {
    let make = await VehicleMakesService.getVehicleMake(2);
    this.setVehicleMakeToSeeDetails(make);
  }

  vehicleMakeToSeeDetails = { name: "", abrv: "" };

  setVehicleMakeToSeeDetails(vehicleMake) {
    this.vehicleMakeToSeeDetails = vehicleMake;
  }
}

export default MakeDetailsStore = new MakeDetailsStore();
