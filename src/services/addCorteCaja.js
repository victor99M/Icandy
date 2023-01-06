import endpoints from "endpoints";
const addCorteCaja = async (objecto) => {
	const response = await fetch(endpoints.corteCaja, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};
export default addCorteCaja;
