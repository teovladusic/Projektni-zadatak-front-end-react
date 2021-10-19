const mainUrl = "https://projektnizadatak.azurewebsites.net/vehiclemakes";
const url = `${mainUrl}`;
const createUrl = `${mainUrl}/create`;
const deleteUrl = `${mainUrl}/delete`;
const detailsUrl = `${mainUrl}/details`;
const editUrl = `${mainUrl}/edit`;

export const CreateVehicleMake = async (vehicleMake) => {
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

  await fetch(createUrl, requestOptions);
};

export const DeleteVehicleMake = async (id) => {
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

export const GetVehicleMake = async (id) => {
  let response = await fetch(`${detailsUrl}/${id}`);
  let json = await response.json();
  return json;
};

export const EditVehicleMake = async ({ id, name, abrv }) => {
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
  await fetch(editUrl, requestOptions);
};

export const GetVehicleMakes = async ({
  searchQuery,
  pageNumber,
  pageSize,
  orderBy,
}) => {
  const queryStringParams = `?SearchQuery=${encodeURIComponent(
    searchQuery
  )}&PageNumber=${encodeURIComponent(pageNumber)}&PageSize=${encodeURIComponent(
    pageSize
  )}&OrderBy=${encodeURIComponent(orderBy)}`;

  const response = await fetch(`${url}${queryStringParams}`);

  return await response.json();
};
