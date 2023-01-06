import Pedido from "./Pedido";

const ContenedorHistorial = ({ fecha, children }) => {
	return (
		<div className="caja-historial">
			<h2>{fecha}</h2>
			{children}
		</div>
	);
};

export default ContenedorHistorial;
