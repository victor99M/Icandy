//const URL = "http://localhost/icandy/API/insertarProducto.php";
import endpoints from "endpoints";

const addProductos = async (producto) => {
  const response = await fetch(endpoints.addProducto, {
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

export default addProductos;
