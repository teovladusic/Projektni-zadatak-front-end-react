class VehicleMakesService {
  mainUrl = "https://projektnizadatak.azurewebsites.net/vehiclemakes";
  url = `${this.mainUrl}`;
  createUrl = `${this.mainUrl}/create`;
  deleteUrl = `${this.mainUrl}/delete`;
  detailsUrl = `${this.mainUrl}/details`;
  editUrl = `${this.mainUrl}/edit`;

  createVehicleMake = async (vehicleMake) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: vehicleMake.name,
        abrv: vehicleMake.abrv,
      }),
    };

    await fetch(this.createUrl, requestOptions);
  };

  deleteVehicleMake = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    let response = await fetch(`${this.deleteUrl}/${id}`, requestOptions);
    await response.json();
  };

  getVehicleMake = async (id) => {
    let response = await fetch(`${this.detailsUrl}/${id}`);
    let json = await response.json();
    return json;
  };

  editVehicleMake = async ({ id, name, abrv }) => {
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
      }),
    };
    await fetch(this.editUrl, requestOptions);
  };

  getVehicleMakes = async ({ searchQuery, pageNumber, pageSize, orderBy }) => {
    const queryStringParams = `?SearchQuery=${encodeURIComponent(
      searchQuery
    )}&PageNumber=${encodeURIComponent(
      pageNumber
    )}&PageSize=${encodeURIComponent(pageSize)}&OrderBy=${encodeURIComponent(
      orderBy
    )}`;

    const response = await fetch(`${this.url}${queryStringParams}`);

    return await response.json();
  };
}

export default VehicleMakesService = new VehicleMakesService();
