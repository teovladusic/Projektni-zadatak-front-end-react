let mainUrl = "https://projektnizadatak.azurewebsites.net/vehiclemodels";
const url = `${mainUrl}`;
const createUrl = `${mainUrl}/create`;
const deleteUrl = `${mainUrl}/delete`;
const detailsUrl = `${mainUrl}/details`;
const editUrl = `${mainUrl}/edit`;

export const CreateVehicleModel = async (vehicleModel) => {
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

  await fetch(createUrl, requestOptions);
};

export const DeleteVehicleModel = async (id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  let response = await fetch(`${deleteUrl}/${id}`, requestOptions);
  await response.json();
};

export const GetVehicleModel = async (id) => {
  let response = await fetch(`${detailsUrl}/${id}`);
  let json = await response.json();
  return json;
};

export const EditVehicleModel = async ({ id, name, abrv, vehicleMakeId }) => {
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
  var response = await fetch(editUrl, requestOptions);
  console.log(response);
};

export const GetVehicleModels = async ({
  searchQuery,
  pageNumber,
  pageSize,
  orderBy,
  makeName,
}) => {
  const queryStringParams = `?SearchQuery=${encodeURIComponent(
    searchQuery
  )}&PageNumber=${encodeURIComponent(pageNumber)}&PageSize=${encodeURIComponent(
    pageSize
  )}&OrderBy=${encodeURIComponent(orderBy)}&MakeName=${encodeURIComponent(
    makeName
  )}`;

  const response = await fetch(`${url}${queryStringParams}`);

  const jsonResponse = await response.json();
  return jsonResponse;
};
