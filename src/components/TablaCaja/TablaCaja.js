import "./style.css";
import addVentaCaja from "services/addVentaCaja";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TablaCaja = ({ arreglo, compra, rend, compradorid }) => {
	const alertaSucees = (mensaje) => {
		toast.success(mensaje, {
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
	const alertaError = (mensaje) => {
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

	var cont = 1;
	var dataCompra = {};

	const generarCompra = () => {
		var total = arreglo
			.map((producto) => producto.total)
			.reduce((prev, curr) => prev + curr, 0);

		var inversion_total = arreglo
			.map((producto) => producto.inversion_PR * producto.unidades)
			.reduce((prev, curr) => prev + curr, 0);

		dataCompra.productos = arreglo;
		dataCompra.totalCompra = total;
		dataCompra.inversion_total = inversion_total;
		/*aqui va el id del cliente en caso de que no se ponmga id en el input
    se usara el id del empelado que realizo la venta
    */

		dataCompra.id_cliente = compradorid;
		addVentaCaja(dataCompra).then((response) => {
			if (response) {
				alertaSucees("¡Se realizo la compra con exito!");
				rend();
			} else {
				alertaError("¡ups algo salio mal!");
			}
		});
	};

	return (
		<div className="principal">
			<div className="table_container">
				<table className="tablaDiseño">
					<thead className="CabezeraTabla">
						<tr className="filaDiseño">
							<th>Numero</th>

							<th>Producto</th>

							<th>Codigo</th>

							<th>Precio</th>

							<th>Cantidad</th>

							<th>Total</th>

							<th style={{ color: "#0092ff" }}>Eliminar</th>
						</tr>
					</thead>

					<tbody className="filaProductos">
						{arreglo.map((producto) => {
							return (
								<tr key={producto.id_PR}>
									<td>{cont++}</td>

									<td>{producto.nombre_PR}</td>

									<td>{producto.id_PR}</td>

									<td>{producto.precio_PR}</td>

									<td>{producto.unidades}</td>

									<td>{producto.total}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="Botones">
				<button className="botonGenerarCompra" onClick={generarCompra}>
					Generar compra
				</button>
				<button className="botonCancelarCompra" onClick={compra}>
					Cancelar Compra
				</button>
			</div>
			{/* mostramos la suma del total de todos los productos reduce nos manda la
        usma de todos los arreglos */}
			<div className="totalDiseño">
				<p className={"precio"}>
					{"$"}
					{arreglo
						.map((producto) => producto.total)
						.reduce((prev, curr) => prev + curr, 0)}
				</p>
				<h5 className="totalDiseñoTitulo">Total a Pagar </h5>
			</div>
		</div>
	);
};

export default TablaCaja;
