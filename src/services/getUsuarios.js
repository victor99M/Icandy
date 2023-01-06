import endpoints from "endpoints";

const URL = endpoints.getUsuarios;

const getUsuarios = async () => {
	const response = await fetch(URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const usuariosJSON = await response.json();

	const usuarios = usuariosJSON.map((usuario) => {
		const { id, nombre, correo, direccion, telefono, tipo } = usuario;
		return { id, nombre, tipo, telefono, correo, direccion };
	});
	return usuarios;
};

export default getUsuarios;
