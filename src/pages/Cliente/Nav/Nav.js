import "./styles.css";
import Buscador from "components/Buscador";
import { useState, useEffect } from "react";
import menu from "assets/Img/menu.png";
import shoppingCart from "assets/Img/shopping-cart.png";
import logo_2 from "assets/Img/logo_2.png";
import logo from "assets/Img/logo.png";
// import defaultProfileImage from "assets/Img/default-profile-image.png";
import { Link } from "react-router-dom";
import CajaCarrito from "components/cajaCarrito/CajaCarito";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "endpoints";

const defaultProfileImage =
	"https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-imagen-de-perfil-del-hombre-de-negocios-avatar.jpg?ver=6";

const Nav = ({ data, tamano, funcion, session, setSession }) => {
	let user = {};

	const userJson = window.localStorage.getItem("loggedUser");

	if (userJson) {
		user = JSON.parse(userJson);
	}
	const [menuModal, setMenuModal] = useState(false);
	const [menuPerfil, setMenuPerfil] = useState(false);
	const [carrito, setCarrito] = useState(false);
	const [nombre, setNombre] = useState("");
	const [foto, setFoto] = useState("");

	const navigate = useNavigate();

	const handleMenuBtn = () => setMenuModal(!menuModal);
	const handlePerfilBtn = () => setMenuPerfil(!menuPerfil);
	const handleModalOff = () => {
		setMenuModal(false);
		setMenuPerfil(false);
	};

	async function getPerfil() {
		const fd_login = new FormData();
		fd_login.append("id_C", user.id_C);

		const res = await axios.post(endpoints.getPerfilUsuario, fd_login);
		if (res.data != null) {
			setNombre(`${res.data.nombre_C}`);
			setFoto("https://icandymx.xyz/icandy/API/" + res.data.foto_C);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("loggedUser")) getPerfil();
	}, [nombre, foto]);

	const handleCloseSession = () => {
		window.localStorage.setItem("loggedUser", "");
		setFoto("");
		handleModalOff();
		setSession(!session);
		navigate("/");
	};
	const handleCarrito = () => setCarrito(!carrito);

	const handleLogin = (e) => {
		e.preventDefault();
		const login = localStorage.getItem("loggedUser");

		if (!login) {
			navigate("/login");
			return;
		}
		handlePerfilBtn();
	};

	return (
		<>
			<div className="nav-aux">
				<div className="nav-container">
					<Link
						onClick={handleModalOff}
						className="nav-logo-container"
						to={"/"}
					>
						<img
							className="nav-logo nav-logo-escritorio"
							src={logo}
							alt="logo"
						/>
						<img className="nav-logo nav-logo-movil" src={logo_2} alt="logo" />
					</Link>
					<div className="nav-search-aux">
						<div className="nav-search">
							<Buscador filter={false} />
						</div>
					</div>
					<button className="nav-menu nav-icon" onClick={handleMenuBtn}>
						<img className="nav-menu-img" src={menu} alt="menu" />
					</button>
					<button className="nav-carrito nav-icon" onClick={handleCarrito}>
						<img className="nav-carrito-img" src={shoppingCart} alt="carrito" />
						<p className="nav-carrito-cont">{tamano}</p>
					</button>

					<div
						className={`nav-menu-modal ${!menuModal && "componente-oculto"}`}
					>
						<div className="nav-menu-links nav-menu-link-profile">
							<Link
								className="nav-menu-link-login nav-menu-link-login-movil"
								onClick={handleMenuBtn}
								to={userJson ? "miPerfil" : "/login"}
							>
								<img
									className="nav-menu-link-img"
									src={user && foto ? foto : defaultProfileImage}
									alt="perfil"
								/>{" "}
								{userJson ? nombre : "Iniciar sesión"}
							</Link>
							<button
								className="nav-menu-link-login nav-menu-link-login-escritorio"
								onClick={handleLogin}
							>
								<img
									className="nav-menu-link-img"
									src={user && foto ? foto : defaultProfileImage}
									alt="perfil"
								/>{" "}
								{userJson ? nombre : "Iniciar sesión"}
							</button>
							{menuPerfil && (
								<div className="nav-menu-perfil">
									<Link
										onClick={handlePerfilBtn}
										className="nav-menu-perfil-link"
										to={"/miPerfil"}
									>
										Ver Perfil
									</Link>
									<Link
										onClick={handlePerfilBtn}
										className="nav-menu-perfil-link"
										to={"/historial"}
									>
										Historial de compras
									</Link>
									<button
										className="nav-menu-perfil-link"
										onClick={handleCloseSession}
									>
										Cerrar Sesión
									</button>
								</div>
							)}
						</div>
						<div className="nav-menu-group">
							<Link onClick={handleModalOff} className="nav-menu-link" to="/">
								Inicio
							</Link>
							<a
								onClick={handleModalOff}
								className="nav-menu-link"
								href="#footer"
							>
								Sobre nosotros
							</a>
							<Link
								onClick={handleModalOff}
								className="nav-menu-link"
								to="/contact"
							>
								Contacto
							</Link>
							{localStorage.getItem("loggedUser") ? (
								<>
									<Link
										onClick={handleModalOff}
										className="nav-menu-link nav-perfil-menu-link-movil"
										to={"/historial"}
									>
										Historial de compras
									</Link>
									<button
										className="nav-menu-link-btn nav-perfil-menu-link-movil"
										onClick={handleCloseSession}
									>
										Cerrar Sesión
									</button>
								</>
							) : null}
						</div>
					</div>
				</div>
				{carrito && (
					<div className="carrito-productos">
						<div className="compra-carrito">
							<h3>Carrito de compras</h3>
							<Link
								to={userJson ? "/carrito" : "/login"}
								onClick={() => setCarrito(false)}
								className="carrito-productos-link"
							>
								Comprar carrito
							</Link>
						</div>
						{!tamano ? (
							<h1>El carrito esta vacío</h1>
						) : (
							data.map((carrito) => (
								<CajaCarrito
									key={carrito.id_PR}
									datos={carrito}
									funcion1={funcion}
								/>
							))
						)}
					</div>
				)}
			</div>
			{(menuModal || menuPerfil) && (
				<div className="nav-close-overlay" onClick={handleModalOff} />
			)}
		</>
	);
};

export default Nav;
