import AdminContainer from "components/AdminContainer";
import NavAdminContainer from "components/NavAdminContainer";
import MainContainer from "components/MainContainer";
import Usuarios from "pages/Administrador/Usuarios/Usuarios";
import Caja from "pages/Administrador/Caja/Caja";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "pages/Administrador/Menu/Menu";
import Pedidos from "./Administrador/Pedidos/Pedidos";
import Productos from "./Administrador/Productos/Productos";
import SurtirProductos from "./Administrador/SurtirProductos/SurtirProductos";
import Cortecaja from "./Administrador/CorteCaja/Cortecaja";
import Perfil from "./Cliente/Perfil/Perfil";

const Administrador = ({ session, setSession }) => {
	const userJson = window.localStorage.getItem("loggedUser");
	const user1 = userJson ? JSON.parse(userJson) : {};
	return (
		<MainContainer session={session} setSession={setSession}>
			<NavAdminContainer>
				<Menu></Menu>
			</NavAdminContainer>
			<Routes>
				<Route path="/" element={<Caja />} />
				<Route
					path="/productos"
					element={
						<AdminContainer>
							<Productos />
						</AdminContainer>
					}
				/>
				<Route
					path="/surtir_productos"
					element={
						<AdminContainer>
							<SurtirProductos />
						</AdminContainer>
					}
				/>
				<Route
					path="/usuarios"
					element={
						<AdminContainer>
							<Usuarios />
						</AdminContainer>
					}
				/>
				<Route
					path="/caja"
					element={
						<AdminContainer>
							<Cortecaja />
						</AdminContainer>
					}
				/>
				<Route path="/historial" element={<div />} />
				<Route
					path="/pedidos"
					element={
						<AdminContainer>
							<Pedidos />
						</AdminContainer>
					}
				/>
				<Route
					path="/configuracion"
					element={
						<AdminContainer>
							<Perfil userData={user1} type={true} />
						</AdminContainer>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</MainContainer>
	);
};

export default Administrador;
