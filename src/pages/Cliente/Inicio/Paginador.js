import { Link, useLocation, useParams } from "react-router-dom";

const Paginador = ({ paginador, paginas }) => {
	return (
		<div className="inicio-paginador">
			<p className="paginador-container">
				{paginador > 1 && (
					<Link
						className="paginador-pagina paginador-siguiente"
						to={`/${paginador - 1}`}
					>
						{"<"}
					</Link>
				)}
				<MostrarPaginas paginador={paginador} paginas={paginas} />
				{paginador < paginas && (
					<Link
						className="paginador-pagina paginador-anterior"
						to={`/${+paginador + 1}`}
					>
						{">"}
					</Link>
				)}
			</p>
		</div>
	);
};

const MostrarPaginas = ({ paginador, paginas }) => {
	let numbers = [];

	for (let i = 1; i <= paginas; i++) {
		numbers.push(
			<Link
				key={i}
				className={`paginador-pagina ${
					paginador == i ? "paginador-pagina-focus" : ""
				}`}
				to={`/${i}`}
			>
				{i}
			</Link>
		);
	}

	return <>{numbers}</>;
};

export default Paginador;
