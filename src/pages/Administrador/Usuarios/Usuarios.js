import "./styles.css";
import Button from "components/Button";
import getUsuarios from "services/getUsuarios";
import { useEffect, useState } from "react";
import RegistrarUsuario from "components/RegistrarUsuario";
import Table from "components/Table";
import AdminBuscador from "components/AdminBuscador";

const CAMPOS = [
	"ID",
	"Nombre",
	"Tipo usuario",
	"Teléfono",
	"Correo",
	"Dirección",
];

const Usuarios = () => {
	const [modalUsuario, setModalUsuario] = useState(false);
	const [usuarios, setUsuarios] = useState({});
	const [search, setSearch] = useState("");
	const [addUser, setAddUser] = useState(false);

	const handleAdd = () => {
		setModalUsuario(!modalUsuario);
	};

	useEffect(() => {
		getUsuarios().then((response) => setUsuarios(response));
	}, [addUser]);

	return (
		<>
			<AdminBuscador keyword={setSearch} />
			<Table
				campos={CAMPOS}
				datos={Object.values(usuarios)}
				filtro="nombre"
				search={search}
			/>
			<div className="contenedor-button">
				<Button onClick={handleAdd}>Agregar usuario</Button>
			</div>
			<RegistrarUsuario
				modalUsuario={modalUsuario}
				setModalUsuario={setModalUsuario}
				addUser={addUser}
				setAddUser={setAddUser}
			/>
		</>
	);
};

export default Usuarios;
