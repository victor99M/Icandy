import endpoints from "endpoints";
const getMonto = async (data) => {
	const response = await fetch(endpoints.getMonto, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseJSON = await response.json();

	return responseJSON;
};

export default getMonto;
