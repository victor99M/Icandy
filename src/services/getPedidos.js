import endpoints from "endpoints";

const URL = endpoints.getPedidos;

const getPedidos = async () => {
	const response = await fetch(URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const pedidosJSON = await response.json();

	const pedidos = pedidosJSON.map((pedido) => {
		const {
			id_VP,
			nombre_C,
			apellidos_C,
			estado_VP,
			fecha_VP,
			fechaDeEntrega_VP,
		} = pedido;
		const nombre = `${nombre_C} ${apellidos_C}`;

		return {
			id_VP,
			nombre,
			estado_VP,
			fecha_VP,
			fechaDeEntrega_VP,
		};
	});
	return pedidos;
};

export default getPedidos;
