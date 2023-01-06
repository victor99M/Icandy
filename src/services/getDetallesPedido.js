import endpoints from "endpoints";

const URL = endpoints.getDetallesPedido;

const getDetallesPedido = async (pedido) => {
	const request = { pedidoID: pedido };
	const response = await fetch(URL, {
		method: "POST",
		body: JSON.stringify(request),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const detallesPedidoJSON = await response.json();

	const detallesPedido = detallesPedidoJSON.detalles.map((fila) => {
		const {
			nombre_C,
			apellidos_C,
			estado_VP,
			fecha_VP,
			fechaDeEntrega_VP,
			direccion_C,
			telefono_C,
			total_VP,
		} = fila;
		const nombre = `${nombre_C} ${apellidos_C}`;

		return {
			nombre,
			estado_VP,
			fecha_VP,
			fechaDeEntrega_VP,
			direccion_C,
			telefono_C,
			total_VP,
		};
	});

	const detallesProductos = detallesPedidoJSON.productos.map((fila) => {
		const { id_PR, nombre_PR, precio_PR, unidadPeso_PR, cantidad_D, total_D } =
			fila;

		return { id_PR, nombre_PR, precio_PR, unidadPeso_PR, cantidad_D, total_D };
	});

	return { detallesPedido, detallesProductos };
};

export default getDetallesPedido;
