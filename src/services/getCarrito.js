import endpoints from "endpoints";
const getCarrito = async (objecto) => {
	const response = await fetch(endpoints.getCarrito, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default getCarrito;
