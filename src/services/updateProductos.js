import endpoints from "endpoints";

const updateProductos = async (producto) => {
  const response = await fetch(endpoints.updateProductos, {
    //URL
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJSON = await response.json();

  return responseJSON;
};

export default updateProductos;
