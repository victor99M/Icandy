import "./styles.css";
import "pages/Administrador/Pedidos/styles.css";
import ContenedorHistorial from "./ContenedorHistorial";
import getDetallesPedido from "services/getDetallesPedido";
import { useState, useEffect } from "react";
import getHistorial from "services/getHistorial";
import Pedido from "./Pedido";
import DetallesCompra from "components/DetallesCompra";
import BuscadorHistorial from "components/BuscadorHistorial";
import { Link } from "react-router-dom";

const Historial = () => {
	const [historialCliente, setHistorialCliente] = useState([]);
	const [modalHistorial, setModalHistorial] = useState(false);
	const [pedidoDetalle, setPedidoDetalle] = useState({});
	const [pedidoProductos, setPedidoProductos] = useState({});
	const [keyword, setKeyword] = useState("");

	const [fechas, setFechas] = useState([]);
	const dataLocal = JSON.parse(localStorage.getItem("loggedUser"));
	const CLIENTE = dataLocal ? dataLocal.id_C : "";

	const handleDetalles = (e) => {
		getDetallesPedido(e.target.name).then((response) => {
			setPedidoDetalle(response.detallesPedido);
			setPedidoProductos(response.detallesProductos);
			setModalHistorial(!modalHistorial);
		});
	};

	useEffect(() => {
		getHistorial(CLIENTE).then((response) => {
			setHistorialCliente(response);

			let fechasAux = [];
			let fechaActual = null;
			Object.values(response).map((fila) => {
				if (fechaActual != fila.fecha_VP) {
					fechasAux.push(fila.fecha_VP);
					fechaActual = fila.fecha_VP;
				}
			});
			setFechas([...fechasAux]);
		});
	}, []);

	useEffect(() => {
		let fechasAux = [];
		let fechaActual = null;

		const response = Object.values(historialCliente).filter((fila) => {
			return Object.keys(fila).reduce(
				(previous, current) =>
					previous +
					fila[current].toLowerCase().includes(keyword.trim().toLowerCase()),
				false
			);
		});

		Object.values(response).map((fila) => {
			if (fechaActual != fila.fecha_VP) {
				fechasAux.push(fila.fecha_VP);
				fechaActual = fila.fecha_VP;
			}
		});
		setFechas([...fechasAux]);
	}, [keyword]);

	return (
		<>
			<div className="historial-aux">
				<div className="historial-container">
					<div className="historial-filtros">
						<p>
							<Link to="/miPerfil">Usuario</Link> {" > "}{" "}
							<Link to="/historial">Historial</Link>
						</p>
					</div>
					<h1 className="historial-titulo">Compras</h1>
					<div className="historial-buscador-container">
						<div className="historial-buscador">
							<BuscadorHistorial keyword={setKeyword}></BuscadorHistorial>
						</div>
					</div>
					<div className="historial-pedidos-container">
						{fechas.length == 0 && (
							<h1 className="historial-sin-pedidos">
								No existen pedidos en esta cuenta todavía
							</h1>
						)}
						{fechas.map((fecha) => (
							<ContenedorHistorial key={fecha} fecha={fecha}>
								{Object.values(historialCliente)
									.filter((fila) => {
										return Object.keys(fila).reduce(
											(previous, current) =>
												previous +
												fila[current]
													.toLowerCase()
													.includes(keyword.trim().toLowerCase()),
											false
										);
									})
									.map(
										(fila) =>
											fecha === fila.fecha_VP && (
												<Pedido
													key={fila.id_VP}
													datos={fila}
													handleDetalles={handleDetalles}
												/>
											)
									)}
							</ContenedorHistorial>
						))}
						{/* <ContenedorHistorial historialCliente={historialCliente} /> */}
					</div>
				</div>
			</div>
			{Object.keys(pedidoDetalle).length !== 0 &&
				Object.keys(pedidoProductos).length !== 0 && (
					<DetallesCompra
						modalDetalles={modalHistorial}
						setModalDetalles={setModalHistorial}
						pedidoDetalle={pedidoDetalle}
						pedidoProductos={pedidoProductos}
						usuario={"Cliente"}
						font="1.9em"
					/>
				)}
		</>
	);
};

export default Historial;
