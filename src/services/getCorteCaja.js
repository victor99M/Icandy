import endpoints from "endpoints";
const getCorteCaja = async (objecto) => {
	const response = await fetch(endpoints.getCorteCaja, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default getCorteCaja;
