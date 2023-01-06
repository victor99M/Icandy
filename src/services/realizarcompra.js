import endpoints from "endpoints";

const realizarcompra = async (objecto) => {
	const response = await fetch(endpoints.compraCarrito, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default realizarcompra;
