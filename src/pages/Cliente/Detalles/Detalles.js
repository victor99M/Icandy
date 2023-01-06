import "./styles.css";
import { useState, useEffect } from "react";
import newProduct from "assets/Img/new_product.png";
import getProductoDetalles from "services/getProductoDetalles";
import Card from "../Inicio/Card";
import { useParams, Link, useNavigate } from "react-router-dom";
import addCarrito from "services/addCarrito";
import Product from "services/mercadoPAgo";
const Detalles = ({ funcion, data }) => {
	let user = {};

	const userJson = window.localStorage.getItem("loggedUser");

	if (userJson) {
		user = JSON.parse(userJson);
	}
	const navigate = useNavigate();
	const [cantidad, setCantidad] = useState(1);
	const [productoActual, setProductoActual] = useState({});
	const [productos, setProductos] = useState([]);

	const { id } = useParams();
	const variable = [];
	const id_cliente = 0;
	useEffect(() => {
		if (userJson) {
			getProductoDetalles(id, user.id_C).then((response) => {
				setProductoActual(response[0][0]);
				setProductos(response[1]);

				if (!response[2][0]) {
				} else {
					setCantidad(parseInt(response[2][0].cantidad_CA));
				}
			});
		} else {
			getProductoDetalles(id, 1).then((response) => {
				setProductoActual(response[0][0]);
				setProductos(response[1]);
				if (!response[2][0]) {
				} else {
					setCantidad(parseInt(response[2][0].cantidad_CA));
				}
			});
		}
		window.scrollTo(0, 0);
	}, [id]);

	productoActual.cantidad_CA = cantidad;
	variable.push(productoActual);

	const handleIncrement = () => {
		setCantidad(
			cantidad == productoActual.cantidad_PR
				? productoActual.cantidad_PR
				: cantidad + 1
		);
		variable.length = 0;
	};
	const handleDecrement = () => setCantidad(cantidad <= 0 ? 0 : cantidad - 1);
	// console.log(variable);
	const comprarAhora = () => {
		agregarCarritoDetalles();
		navigate("/carrito");
	};

	const agregarCarritoDetalles = () => {
		if (userJson) {
			const objcarrito = {};
			objcarrito.id_C = user.id_C;
			objcarrito.id_PR = productoActual.id_PR;
			objcarrito.cantidad_PR = cantidad;
			objcarrito.estado = "detalles";
			addCarrito(objcarrito).then((response) => {
				if (response) {
					funcion();
				} else {
					// alertaError("¡ups algo salio mal!");
				}
			});
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="detalles-container">
			<div className="detalles-filtros">
				<p>
					<Link to="/">Inicio</Link>
					{" > "}
					<Link to={`/detalles/${productoActual.id_PR}`}>
						{productoActual.nombre_PR}
					</Link>{" "}
				</p>
			</div>
			<div className="detalles-producto">
				<div className="detalles-producto-container-image">
					{productoActual.novedad_PR == true && (
						<img
							className="detalles-producto-new"
							src={newProduct}
							alt="producto nuevo"
						/>
					)}
					<img
						className="detalles-producto-image"
						src={productoActual.foto_PR}
						alt={productoActual.nombre_PR}
					/>
				</div>
				<div className="detalles-producto-compra">
					<p className="detalles-producto-nombre">
						{productoActual.nombre_PR}
						<span
							id={productoActual.cantidad_PR <= 0 ? "detalles-agotado" : ""}
						>
							{productoActual.cantidad_PR > 0 ? "Disponible" : "Agotado"}
						</span>
					</p>
					<p className="detalles-producto-precio">
						Precio: <span>{`$${productoActual.precio_PR}.00`}</span>
					</p>
					<p className="detalles-producto-total">
						Total <br />
						<span>{`$${productoActual.precio_PR * cantidad}.00`}</span>
					</p>
					<div className="detalles-producto-incremento">
						<button className="" onClick={handleDecrement}>
							-
						</button>
						<p className="">{cantidad}</p>
						<button className="" onClick={handleIncrement}>
							+
						</button>
					</div>
					<p className="detalles-producto-disponible">
						{productoActual.cantidad_PR} Disponibles
					</p>
					<div className="detalles-producto-botones">
						{/* {variable ? <Product datos={variable} /> : null} */}
						<button
							className="detalles-producto-comprar-btn"
							onClick={comprarAhora}
						>
							Comprar
						</button>
						<button
							className="detalles-producto-carrito-btn"
							onClick={agregarCarritoDetalles}
						>
							Añadir al carrito
						</button>
					</div>
				</div>
			</div>
			<div className="detalles-descripcion">
				<p className="detalles-descripcion-h">Descripcion</p>
				<div className="detalles-descripcion-detalles">
					<p id="detalles-descripcion-p">{productoActual.descripcion_PR}</p>
					<p>
						Cantidad:{" "}
						<span>
							{`${productoActual.cantidad_PR} ${productoActual.nombre_PR} por paquete`}
						</span>
					</p>
					<p>
						Gramos por pieza: <span>{productoActual.nombreDescripcion_PR}</span>
					</p>
				</div>
			</div>
			<div className="detalles-relacionados">
				<p className="detalles-relacionados-p">Podría interesarte</p>
				{Object.values(productos).map((producto) => (
					<Card key={producto.id_PR} producto={producto} funcion1={funcion} />
				))}
			</div>
		</div>
	);
};

export default Detalles;
