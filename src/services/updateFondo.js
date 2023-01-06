import endpoints from "endpoints";
const updateFondo = async (objecto) => {
	const response = await fetch(endpoints.actualizarFondo, {
		method: "POST",
		body: JSON.stringify(objecto),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const repuestaJson = await response.json();
	return repuestaJson;
};

export default updateFondo;
