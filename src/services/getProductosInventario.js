import endpoints from "endpoints";

const URL = endpoints.getProductosInventario;
const TIPO = { Type: "Read" };

const getProductos = async () => {
  TIPO["User"] = "N/A";
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(TIPO),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const productosJSON = await response.json();

  return productosJSON;
};

export default getProductos;
