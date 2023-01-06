import styled from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./Cliente/Nav/Nav";
import Inicio from "./Cliente/Inicio/Inicio";
import Detalles from "./Cliente/Detalles/Detalles";
import Footer from "./Cliente/Footer/Footer";
import Historial from "./Cliente/Historial/Historial";
import Carrito from "./Cliente/Carrito/Carrito";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCarrito from "services/getCarrito";
import Perfil from "./Cliente/Perfil/Perfil";
import Login from "./Cliente/Login/Login";
import Contacto from "./Cliente/Contacto/Contacto";
import Registrarme from "./Cliente/Login/Registrarme";
import Recuperar from "./Cliente/RecuperarContra/Recuperar";

const Cliente = ({ session, setSession }) => {
	const userJson = window.localStorage.getItem("loggedUser");
	const user1 = userJson ? JSON.parse(userJson) : {};
	const { pathname } = useLocation();

	const correcto = (mensaje) => {
		toast.success(mensaje, {
			position: "bottom-left",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Flip,
		});
	};
	const error = (mensaje) => {
		toast.error(mensaje, {
			position: "bottom-left",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Flip,
		});
	};
	const id = { id_C: user1.id_C };
	const [datacarrito, setDatacarrito] = useState([]);
	const [contCarrito, setContCarrito] = useState(0);

	const [user, setUser] = useState(null);

	const handleContadorCarrito = () => {
		correcto("Se agrego al carrito");
		setContCarrito(contCarrito + 1);
	};
	const handleQuitar = (respuesta) => {
		if (respuesta == "anadir") {
			setContCarrito(contCarrito + 1);
		} else if (respuesta == "Agregar") {
			correcto("Se agrego al carrito");
			setContCarrito(contCarrito + 1);
		} else if (respuesta == "Quitar") {
			setContCarrito(contCarrito - 1);
		} else if (respuesta == "Eliminar") {
			setContCarrito(contCarrito - 1);
			error("Se Elimino del carrito");
		} else if (respuesta == "Compra") {
			setContCarrito(contCarrito + 1);
			correcto("Se realizo con exito la compra");
		}
	};
	useEffect(() => {
		if (userJson) {
			getCarrito(id).then((response) => setDatacarrito(response));

			const userJson = window.localStorage.getItem("loggedUser");

			const user = JSON.parse(userJson);
			setUser(user);
		} else {
			setDatacarrito({});
		}
	}, [contCarrito, userJson]);
	const tam = datacarrito.length;

	return (
		<Componente>
			{pathname !== "/login" &&
				pathname !== "/registrarme" &&
				pathname !== "/recuperar_contrasena" && (
					<Nav
						data={datacarrito}
						tamano={tam}
						funcion={handleQuitar}
						session={session}
						setSession={setSession}
					/>
				)}
			<Routes>
				<Route path="/" element={<Inicio funcion={handleContadorCarrito} />}>
					<Route
						path="/:page"
						element={<Inicio funcion={handleContadorCarrito} />}
					></Route>
				</Route>
				<Route
					path="/detalles/:id"
					element={
						<Detalles funcion={handleContadorCarrito} data={datacarrito} />
					}
				></Route>
				<Route path="/contact" element={<Contacto />}></Route>
				<Route path="/historial" element={<Historial />}></Route>
				<Route path="/miPerfil" element={<Perfil userData={user1} />}></Route>
				<Route
					path="/carrito"
					element={
						<Carrito data={datacarrito} tamano={tam} quitar={handleQuitar} />
					}
				></Route>
				<Route
					path="/login"
					element={<Login session={session} setSession={setSession} />}
				></Route>
				<Route
					path="/registrarme"
					element={<Registrarme session={session} setSession={setSession} />}
				></Route>
				<Route
					path="/recuperar_contrasena"
					element={<Recuperar session={session} setSession={setSession} />}
				></Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

			{pathname !== "/login" &&
				pathname !== "/registrarme" &&
				pathname !== "/recuperar_contrasena" && <Footer />}
			<ToastContainer />
		</Componente>
	);
};

export default Cliente;

const Componente = styled.div`
	width: 100%;
	height: 100%;
`;
