import endpoints from "endpoints";

const URL = endpoints.updatePedido;

const updatePedido = async (pedido) => {
	const response = await fetch(URL, {
		method: "POST",
		body: JSON.stringify(pedido),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const responseJSON = await response.json();

	return responseJSON.success || responseJSON.error;
};

export default updatePedido;
