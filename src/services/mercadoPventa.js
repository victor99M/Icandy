import endpoints from "endpoints";

const mercaPventa = async (objecto) => {
	const response = await fetch(endpoints.mercadopagoVenta, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default mercaPventa;
