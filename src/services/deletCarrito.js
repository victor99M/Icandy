import endpoints from "endpoints";
const deletCarrito = async (objecto) => {
	const response = await fetch(endpoints.deletCarrito, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default deletCarrito;
