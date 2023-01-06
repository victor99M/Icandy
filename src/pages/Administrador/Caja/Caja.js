import "./styles.css";
import Tabla from "components/TablaCaja/TablaCaja";
import imagenes from "assets/Img/nugs.png";
import { useEffect, useState, useRef } from "react";
import getProductos from "services/getProductos";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCliente from "services/getCliente";
let bandera = false;
const Caja = () => {
	//obtenemos al usuairo logueado
	const userJson = window.localStorage.getItem("loggedUser");
	let user = {};

	user = userJson ? JSON.parse(userJson) : null;

	var objecto = {};
	const id_usuario = {};
	//donde lamacenamos los productosd
	const [productos, setProductos] = useState([]);
	const [carrito, setCarrito] = useState([]);
	/***** *********obtener datos de objecto************ */
	//cantidad_PR
	const [disponibles, setDisponibles] = useState(0);
	const [nombre, setNombre] = useState("");
	const [precio, setPrecio] = useState(0);
	const [foto, setFoto] = useState("");
	//arreglo de tabla
	const [unidades, setUnidades] = useState(0);
	const [find, setFind] = useState({});
	const [prueba, SetPrueba] = useState(0);
	//refs
	const idProducto = useRef();
	//variables globales
	var total = unidades * precio;
	//cliente manejador
	/*****************OBTENEMOS LO DATOS DE CLIENTE DE COMPRA FISICA*************************************/
	const entrada = useRef();
	const [clienteid, setClienteid] = useState();
	const [idcompra, setIdcompra] = useState();
	const [datacomprador, setdatacomprador] = useState();

	const handleInput = (e) => {
		setClienteid(e.target.value);
	};

	useEffect(() => {
		//OBETNER DATOS DE BD CLIENTES
		id_usuario.id_cliente = clienteid;
		if (id_usuario.id_cliente) {
			getCliente(id_usuario).then((response) => {
				if (response) {
					response.map((usuario) => {
						setdatacomprador(usuario);
					});
				} else {
				}
			});
			bandera = true;
		} else {
			bandera = false;
			setdatacomprador({});
		}
	}, [clienteid]);

	const alerta = (mensaje) => {
		toast.error(mensaje, {
			position: "bottom-left",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Slide,
		});
	};

	useEffect(() => {
		getProductos().then((response) => {
			setProductos(response);
			if (!response) {
				alerta("Error en base de datos");
			}
		});
	}, [prueba]);

	const renderizar = () => {
		if (prueba == 0) {
			SetPrueba(1);
		} else if (prueba == 1) {
			SetPrueba(0);
		}
		setCarrito([]);
		formatearValores();
	};
	//guardar datos de producto para agregar a la compra
	const handleAgregarProducto = () => {
		if (unidades > 0) {
			objecto = find;
			objecto.unidades = unidades;
			objecto.total = total;
			//hacer tipo push a un arreglo con uses satet
			setCarrito([...carrito, objecto]);
		} else {
			alerta("Debes agregar la cantidad!!!!");
		}
	};
	const handleAumentar = () => {
		if (disponibles > 0) {
			setUnidades(unidades + 1);
			setDisponibles(disponibles - 1);
		}
	};

	const handleQuitar = () => {
		if (unidades > 0) {
			setUnidades(unidades - 1);
			setDisponibles(disponibles + 1);
		}
	};
	const formatearValores = () => {
		setDisponibles(0);
		setNombre("");
		setPrecio("");
		setUnidades(0);
		setFoto("");
	};
	const handleBuscador = () => {
		setUnidades(0);
		const find = productos.find(
			(producto) => producto.id_PR === idProducto.current.value
		);
		setFind(find);
		if (find) {
			setDisponibles(find.cantidad_PR);
			setNombre(find.nombre_PR);
			setPrecio(find.precio_PR);
			setFoto(find.foto_PR);
		} else {
			formatearValores();
		}
	};
	const cancelarCompra = () => {
		setCarrito([]);
		formatearValores();
	};
	return (
		<div className="contendor_Caja">
			<div className="contenedor_Buscador_Caja">
				<h3>Datos Cliente</h3>

				<input
					type="text"
					className="inputs_caja"
					placeholder="Codigo"
					onChange={handleInput}
					ref={entrada}
				/>

				<input
					type="text"
					className="inputs_caja"
					placeholder="Nombre Cliente"
					value={bandera ? datacomprador.nombre_C : ""}
					disabled="disabled"
				/>

				<h3>Datos productos</h3>
				<input
					type="text"
					className="inputs_caja"
					placeholder="Codigo"
					onChange={handleBuscador}
					ref={idProducto}
				/>
				<input
					type="text"
					className="inputs_caja"
					placeholder="Producto"
					value={nombre}
					disabled="disabled"
				/>

				<div className="contendorAumentar">
					{foto === "" ? (
						<div className="contenedo-Imagenes-caja">
							<img
								src="https://camexa-formularios.com/sector/beneficiosLogo/sin-imagen.jpg"
								alt="Imagenes de productos"
								className="Imagenes"
							/>
						</div>
					) : (
						<div className="contenedo-Imagenes-caja">
							<img
								src={foto}
								alt="Imagenes de productos"
								className="Imagenes"
							/>
						</div>
					)}

					<button className="diseñoBotonIncremento" onClick={handleAumentar}>
						+
					</button>
					<p className="diseñoP">{unidades}</p>
					<button className="diseñoBotonIncremento" onClick={handleQuitar}>
						-
					</button>
					<p className="cantidadCaja">{disponibles} Disponibles</p>
				</div>

				<input
					type="text"
					name=""
					id=""
					placeholder="Precio Unitario"
					className="inputs_caja"
					value={" $ " + precio}
					disabled="disabled"
				/>
				<input
					type="text"
					value={total}
					placeholder="Total Producto"
					className="inputs_caja"
					disabled="disabled"
				/>
				<button className="botonAgregar" onClick={handleAgregarProducto}>
					Agregar Producto
				</button>
			</div>
			<div className="contendorTablaCaja">
				{bandera ? (
					<Tabla
						arreglo={carrito}
						compra={cancelarCompra}
						rend={renderizar}
						compradorid={datacomprador.id_C}
					/>
				) : (
					<Tabla
						arreglo={carrito}
						compra={cancelarCompra}
						rend={renderizar}
						compradorid={user.id_C}
					/>
				)}
			</div>
			<ToastContainer />
		</div>
	);
};

export default Caja;
