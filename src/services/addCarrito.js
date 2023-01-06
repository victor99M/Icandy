import endpoints from "endpoints";

const addCarrito = async (objecto) => {
	const response = await fetch(endpoints.addCarrito, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default addCarrito;
