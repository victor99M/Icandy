import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import deletCarrito from "services/deletCarrito";
import anadir_carrito from "services/anadir_carrito";
const ProductoCarrito = ({ datos, funcion1 }) => {
  const HandleElminar = () => {
    const id = { id_PR: datos.id_PR };
    deletCarrito(id).then((response) => {
      if (response) {
        funcion1("Eliminar");
      } else {
        // alertaError("¡ups algo salio mal!");
      }
    });
  };
  const Agregar = () => {
    anadir_carrito(datos, "Agregar").then((response) => {
      if (response) {
        funcion1("anadir");
      } else {
        // alertaError("¡ups algo salio mal!");
      }
    });
  };

  const Quitar = () => {
    anadir_carrito(datos, "Quitar").then((response) => {
      if (response) {
        funcion1("Quitar");
      } else {
        // alertaError("¡ups algo salio mal!");
      }
    });
  };
  return (
    <div className="kk">
      <div className="container-producto-carrito">
        <div className="producto-carrito__imagen">
          <img src={datos.foto_PR} alt="ProductoImagen" className="imagen" />
        </div>
        <div className="contenido-tarjeta">
          <div className="producto-carrito__titulo">
            <p>
              {datos.nombre_PR + " "}
              {datos.piezasCaja_PR + " Piezas "}
              {datos.nombreDescripcion_PR + " c/u"}
            </p>
          </div>
          <div className="producto-carrito__precios">
            <div className="producto-carrito__incremento">
              <button onClick={Quitar}>-</button>
              <div className="cantidad_precioProducto">
                <p>{datos.cantidad_CA}</p>
              </div>

              <button onClick={Agregar}>+</button>
            </div>
            <p className="producto-carrito__cantidad">
              Unidades Disponibles {datos.cantidad_PR}
            </p>
            <div className="producto-carrito__total">
              <p>{"$" + datos.precio_PR * datos.cantidad_CA}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="producto-carrito__botonesCompra ">
        <button className="producto-carrito__borrar" onClick={HandleElminar}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <button className="producto-carrito__comprar">Comprar ahora</button>
      </div>
    </div>
  );
};

export default ProductoCarrito;
