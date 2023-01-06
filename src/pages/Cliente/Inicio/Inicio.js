import "./styles.css";
import { useEffect, useState } from "react";
import getProductos from "services/getProductos";
import Card from "./Card";
import Paginador from "./Paginador";
import { useParams, Link } from "react-router-dom";

const PRODUCTOS_PER_PAGE = 12;

const Inicio = ({ funcion }) => {
	const { page } = useParams();
	const [productos, setProductos] = useState({});
	const [productosPaginados, setProductosPaginados] = useState({});
	const [paginador, setPaginador] = useState(page || 1);
	const [paginas, setPaginas] = useState(1);

	// const [actualizar, setActualizar] = useState(false);
	// const handleEstado = () => {
	// 	actualizar ? setActualizar(false) : setActualizar(true);
	// };

	useEffect(() => {
		getProductos().then((response) => {
			setPaginas(Math.ceil(response.length / PRODUCTOS_PER_PAGE));
			setProductos(Object.values(response));

			let min = page ? (page - 1) * PRODUCTOS_PER_PAGE : 0;
			// let max = page != paginas ? page * PRODUCTOS_PER_PAGE : undefined;
			let max = page
				? page != paginas
					? page * PRODUCTOS_PER_PAGE
					: undefined
				: PRODUCTOS_PER_PAGE;

			setProductosPaginados(
				Object.values(response)
					.filter((product) => product.discontinuo_PR == "0")
					.slice(min, max)
			);
		});
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		let min = page ? (page - 1) * PRODUCTOS_PER_PAGE : 0;
		let max = page
			? page != paginas
				? page * PRODUCTOS_PER_PAGE
				: undefined
			: PRODUCTOS_PER_PAGE;

		setProductosPaginados(
			Object.values(productos)
				.filter((product) => product.discontinuo_PR == "0")
				.slice(min, max)
		);
		setPaginador(page || 1);
	}, [page]);

	return (
		<div className="inicio-container">
			<div className="inicio-filtros">
				<p>
					<Link to="/">Inicio</Link>
				</p>
			</div>
			<div className="inicio-cards">
				{Object.values(productosPaginados).map((producto) => (
					<Card key={producto.id_PR} producto={producto} funcion1={funcion} />
				))}
			</div>
			<Paginador paginador={paginador} paginas={paginas} />
		</div>
	);
};

export default Inicio;
