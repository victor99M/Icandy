import endpoints from "endpoints";

const URL = endpoints.getHistorial;

const getHistorial = async (usuario) => {
	const usuarioJSON = { id: usuario };

	const response = await fetch(URL, {
		method: "POST",
		body: JSON.stringify(usuarioJSON),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseJSON = await response.json();

	return responseJSON;
};

export default getHistorial;
