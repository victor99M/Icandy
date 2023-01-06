import endpoints from "endpoints";

const URL = endpoints.surtirProducto;
const addSurtirProductos = async (data) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  return responseJson;
};
export default addSurtirProductos;
