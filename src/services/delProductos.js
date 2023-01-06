import endpoints from "endpoints";
const URL = endpoints.deleteProducto;

const delProductos = async (producto) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJSON = await response.json();

  return responseJSON;
};

export default delProductos;
