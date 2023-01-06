import "./registrarmeStyles.css";
import React, { useEffect, useRef, useState } from "react";
import addUserRegistrar from "services/addUserRegistrar";
import axios from "axios";
import endpoints from "endpoints";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import logo from "assets/Img/logo.png";

const Registrarme = () => {
	const nombre_ref = useRef();
	const apellido_ref = useRef();
	const calle_ref = useRef();
	const colonia_ref = useRef();
	const cp_ref = useRef();
	const email_ref = useRef();
	const tel_ref = useRef();
	const contrasena_ref = useRef();

	const [imagen, setImagen] = useState(null);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [calle, setCalle] = useState("");
	const [colonia, setColonia] = useState("");
	const [cp, setCp] = useState("");
	const [correo, setCorreo] = useState("");
	const [telefono, setTelefono] = useState("");
	const [contrasena, setContrasena] = useState("");

	const navigate = useNavigate();

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

	async function addImagen(e) {
		e.preventDefault();
		let fd = new FormData();

		fd.append("imagen", imagen);
		fd.append("nombre", nombre);
		fd.append("apellido", apellido);
		fd.append("calle", calle);
		fd.append("colonia", colonia);
		fd.append("cp", cp);
		fd.append("correo", correo);
		fd.append("telefono", telefono);
		fd.append("contrasena", contrasena);

		// Funciona (en este no se usa el addUserRegistrar.js)
		const res = await axios.post(endpoints.registrarUsuarioCliente, fd);

		if (res.data == "1") {
			correcto("¡Cuenta creada, bienvenido! ");
			navigate("/login");
		} else {
			error("Ocurrió un error al registrarte.");
		}
	}

	return (
		<div className="div-contenedor-registrarme">
			<div className="div-fondo-registrarme"></div>
			<a href="/">
				<img className="logo-logo" src={logo} alt="logo" />
			</a>
			<div className="div-form-registrarme">
				<h1>Crear cuenta</h1>
				<form encType="multipart/form-data" method="POST">
					<div className="txt_dato">
						<input
							type="text"
							required
							ref={nombre_ref}
							/* Prueba */
							className="nombre"
							name="nombre"
							onChange={(e) => setNombre(e.target.value)}
						/>
						<span></span>
						<label>Nombre(s):</label>
					</div>
					<div className="txt_dato">
						<input
							type="text"
							required
							ref={apellido_ref}
							onChange={(e) => setApellido(e.target.value)}
						/>
						<span></span>
						<label>Apellido(s):</label>
					</div>
					<div className="txt_dato caca">
						<input
							type="text"
							required
							ref={calle_ref}
							onChange={(e) => setCalle(e.target.value)}
						/>
						<span></span>
						<label>Calle:</label>
					</div>
					<div className="txt_dato">
						<input
							type="text"
							required
							ref={colonia_ref}
							onChange={(e) => setColonia(e.target.value)}
						/>
						<span></span>
						<label>Colonia:</label>
					</div>
					<div className="txt_dato">
						<input
							type="text"
							required
							ref={cp_ref}
							onChange={(e) => setCp(e.target.value)}
						/>
						<span></span>
						<label>CP:</label>
					</div>

					<div className="txt_dato">
						<input
							type="text"
							required
							ref={email_ref}
							onChange={(e) => setCorreo(e.target.value)}
						/>
						<span></span>
						<label>Email:</label>
					</div>
					<div className="txt_dato">
						<input
							type="text"
							required
							ref={tel_ref}
							onChange={(e) => setTelefono(e.target.value)}
						/>
						<span></span>
						<label>Telefono:</label>
					</div>
					<div className="txt_dato">
						<input
							type="password"
							required
							ref={contrasena_ref}
							onChange={(e) => setContrasena(e.target.value)}
						/>
						<span></span>
						<label>Contraseña</label>
					</div>
					<div className="txt_dato">
						<input type="password" required />
						<span></span>
						<label>Confirmar contraseña:</label>
					</div>

					<div /*className="txt_dato cacaImagen"*/ className="">
						<input
							type="file"
							/* Prueba */
							// accept="image/*"
							className="imagen"
							name="imagen"
							accept="image/*"
							onChange={(e) => setImagen(e.target.files[0])}
							multiple
						/>
					</div>

					<button
						className="btn-registrarme"
						type="submit"
						// onClick={(e) => {
						//   handle(e);
						// }}

						/* Prueba */
						onClick={(e) => addImagen(e)}
					>
						Crear cuenta
					</button>
					<div className="signup_link">
						Ya tengo cuenta, inicia <a href="/login">aquí</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Registrarme;
