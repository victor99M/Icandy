import endpoints from "endpoints";
const addVentaCaja = async (objecto) => {
	const response = await fetch(endpoints.ventaCaja, {
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
export default addVentaCaja;
