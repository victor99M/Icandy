import { Link, useNavigate } from "react-router-dom";
import shoppingCart from "assets/Img/shopping-cart.png";
import newProduct from "assets/Img/new_product.png";
import addCarrito from "services/addCarrito";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Card = ({ producto, funcion1 }) => {
	const userJson = window.localStorage.getItem("loggedUser");
	let user = {};
	user = userJson ? JSON.parse(userJson) : null;
	const navigate = useNavigate();
	//const [tempcantidad, setTempcantidad] = useState(0);
	const objcarrito = {};
	const handleProductoCarrito = () => {
		if (userJson) {
			objcarrito.id_C = user.id_C;
			objcarrito.id_PR = producto.id_PR;
			objcarrito.cantidad_PR = 1;
			objcarrito.estado = "carrito";
			addCarrito(objcarrito).then((response) => {
				if (response) {
					funcion1();
				} else {
					//alerta de error
				}
			});
		} else {
			navigate("/login");
		}
	};
	return (
		<div className="inicio-card-container">
			<div className="inicio-card">
				<Link className="inicio-card-link" to={`/detalles/${producto.id_PR}`}>
					{producto.novedad_PR == true && (
						<img
							className="inicio-card-new"
							src={newProduct}
							alt="producto nuevo"
						/>
					)}
					<div className="inicio-card-container-image">
						<img
							className="inicio-card-image"
							src={producto.foto_PR}
							alt={producto.nombre_PR}
						/>
					</div>
					<div className="inicio-card-detalles">
						<p className="card-detalles-nombre">
							{producto.nombre_PR} <br />
							<span>{`${producto.unidadPeso_PR} ${producto.nombreDescripcion_PR}`}</span>
						</p>
						<p className="card-detalles-precio">{`$${producto.precio_PR}.00`}</p>
					</div>
				</Link>
				<div className="inicio-card-botones">
					<p className="card-botones-disponible">
						Disponibles: <span>{producto.cantidad_PR}</span>
					</p>
					{producto.cantidad_PR > 0 ? (
						<button
							className="card-botones-carrito"
							onClick={handleProductoCarrito}
						>
							<img
								className="card-botones-img"
								src={shoppingCart}
								alt="carrito"
							/>
						</button>
					) : (
						<button className="card-botones-carrito card-cero">
							<img
								className="card-botones-img"
								src={shoppingCart}
								alt="carrito"
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
