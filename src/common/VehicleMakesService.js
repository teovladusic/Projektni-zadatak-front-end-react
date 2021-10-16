const createUrl = "https://localhost:44327/VehicleMakes/create";
const deleteUrl = "https://localhost:44327/VehicleMakes/delete";
const detailsUrl = "https://localhost:44327/VehicleMakes/details";
const editUrl = "https://localhost:44327/VehicleMakes/edit";

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
  let json = await response.json();
  console.log(json);
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
