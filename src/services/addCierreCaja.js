import endpoints from "endpoints";
const addCierreCaja = async (objecto) => {
	const response = await fetch(endpoints.cierreCaja, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default addCierreCaja;
