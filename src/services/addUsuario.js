import endpoints from "endpoints";

const URL = endpoints.addUsuario;

const addUsuario = async (user) => {
	const response = await fetch(URL, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const responseJSON = await response.json();

	return responseJSON.success || responseJSON.error;
};

export default addUsuario;
