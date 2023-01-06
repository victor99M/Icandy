import endpoints from "endpoints";
const anadir_carrito = async (objecto, tipo) => {
	const TIPO = { Type: tipo };
	TIPO["Productos"] = objecto;
	const response = await fetch(endpoints.anadirCarrito, {
		method: "POST",
		body: JSON.stringify(TIPO),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default anadir_carrito;
