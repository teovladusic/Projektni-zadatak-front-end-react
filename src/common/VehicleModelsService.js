class VehicleModelsService {
  mainUrl = "https://projektnizadatak.azurewebsites.net/vehiclemodels";
  url = `${this.mainUrl}`;
  createUrl = `${this.mainUrl}/create`;
  deleteUrl = `${this.mainUrl}/delete`;
  detailsUrl = `${this.mainUrl}/details`;
  editUrl = `${this.mainUrl}/edit`;

  createVehicleModel = async vehicleModel => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: vehicleModel.name,
        abrv: vehicleModel.abrv,
        vehicleMakeId: vehicleModel.vehicleMakeId,
      }),
    };

    await fetch(this.createUrl, requestOptions);
  };

  deleteVehicleModel = async id => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    let response = await fetch(`${this.deleteUrl}/${id}`, requestOptions);
    let a = await response.json();
    console.log(a);
  };

  getVehicleModel = async id => {
    let response = await fetch(`${this.detailsUrl}/${id}`);
    let json = await response.json();
    return json;
  };

  editVehicleModel = async ({ id, name, abrv, vehicleMakeId }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        abrv: abrv,
        vehicleMakeId: vehicleMakeId,
      }),
    };
    await fetch(this.editUrl, requestOptions);
  };

  getVehicleModels = async ({
    searchQuery,
    pageNumber,
    pageSize,
    orderBy,
    makeName,
  }) => {
    const queryStringParams = `?SearchQuery=${encodeURIComponent(
      searchQuery
    )}&PageNumber=${encodeURIComponent(
      pageNumber
    )}&PageSize=${encodeURIComponent(pageSize)}&OrderBy=${encodeURIComponent(
      orderBy
    )}&MakeName=${encodeURIComponent(makeName)}`;

    const response = await fetch(`${this.url}${queryStringParams}`);

    const jsonResponse = await response.json();

    return jsonResponse;
  };
}

export default VehicleModelsService = new VehicleModelsService();
