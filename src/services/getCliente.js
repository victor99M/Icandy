import endpoints from "endpoints";
const getCliente = async (objecto) => {
  const response = await fetch(endpoints.obtenerCliente, {
    method: "POST",
    body: JSON.stringify(objecto),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const repuestaJson = await response.json();

  return repuestaJson;
};
export default getCliente;
