import endpoints from "endpoints";

const URL = endpoints.addUserRegistrar;

const addUserRegistrar = async (data) => {
	const response = await fetch(URL, {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
		},
	});
	const responseJson = await response.json();
	return responseJson;
};
export default addUserRegistrar;
