import endpoints from "endpoints";
const getProductos = async () => {
	const response = await fetch(endpoints.productos, {
		method: "POST",
	});

	const ProductosJSON = await response.json();
	return ProductosJSON;
};

export default getProductos;
