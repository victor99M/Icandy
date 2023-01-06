// import image from "assets/Img/editar.png";

const Pedido = ({ datos, handleDetalles }) => {
	const image = "https://cdn-icons-png.flaticon.com/512/1554/1554561.png";

	return (
		<div className="caja-historial-item">
			<div className="caja-historial-item-info">
				<div className="caja-historial-item-info-image">
					<img src={image} alt="imagen-pedido" />
				</div>
				<div className="caja-historial-item-info-container">
					<p>
						Pedido: <span className="span-item">{datos.id_VP}</span>
					</p>
					<p>
						{datos.estado_VP.includes("Entregado")
							? "Llegó el día: "
							: "LLega el día: "}
						<span className="span-item">
							{datos.estado_VP != "Cancelado" ? datos.fechaDeEntrega_VP : "N/A"}
						</span>
					</p>
					<p>
						<span className="span-item">
							{datos.estado_VP == "Pendiente" && "Pendiente de validar"}
							{datos.estado_VP == "Cancelado" && "Pedido cancelado"}
							{datos.estado_VP == "Activo" && "En preparación"}
							{datos.estado_VP == "Entregado" && "Pedido entregado"}
						</span>
					</p>
					<p className="caja-historial-item-info-productos">
						Tipo de venta:{" "}
						<span className="span-item">{datos.tipoVenta_VP}</span>
					</p>
				</div>
			</div>
			<div className={`caja-historial-item-status estado_${datos.estado_VP}`}>
				{datos.estado_VP}
			</div>
			<div className="caja-historial-item-button-container">
				<button
					onClick={handleDetalles}
					className="caja-historial-item-button"
					name={`${datos.id_VP}`}
				>
					Ver compra
				</button>
			</div>
		</div>
	);
};

export default Pedido;
