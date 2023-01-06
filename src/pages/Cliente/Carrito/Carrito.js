import "./styles.css";
import ProductoCarrito from "components/ProductoCarrito/ProductoCarrito";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Product from "services/mercadoPAgo";
import realizarcompra from "services/realizarcompra";
import getCliente from "services/getCliente";
const FORM_ID = "payment-form";

const Carrito = ({ data, tamano, quitar }) => {
  let user = {};
  const id_usuario = {};
  const userJson = window.localStorage.getItem("loggedUser");
  const [dataUser, setDatauser] = useState([]);

  if (userJson) {
    user = JSON.parse(userJson);
    id_usuario.id_cliente = user.id_C;
  }
  const [Total, setTotal] = useState(0);
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let estado = query.get("status");
  let id_pago = query.get("payment_id");
  const dataCompra = {};

  useEffect(() => {
    if (userJson) {
      getCliente(id_usuario).then((response) => {
        if (response) {
          response.map((usuario) => {
            setDatauser(usuario);
          });
        } else {
        }
      });
    } else {
    }
  }, []);

  useEffect(() => {
    setTotal(
      data
        .map((producto) => producto.precio_PR * producto.cantidad_CA)
        .reduce((prev, curr) => prev + curr, 0)
    );
    if (estado == "approved") {
      var total = data
        .map((producto) => producto.precio_PR * producto.cantidad_CA)
        .reduce((prev, curr) => prev + curr, 0);

      var inversion_total = data
        .map((producto) => producto.inversion_PR * producto.cantidad_CA)
        .reduce((prev, curr) => prev + curr, 0);
      dataCompra.id_cliente = user.id_C;
      dataCompra.productos = data;
      dataCompra.totalCompra = total;
      dataCompra.inversion_total = inversion_total;
      realizarcompra(dataCompra).then((response) => {
        if (response) {
          quitar("Compra");
        } else {
        }
      });
    }
  }, [data]);

  return (
    <div className="container-principal">
      <div className="container-carrito">
        <div className="container-carrito__titulo">
          <h3>Carrito ({tamano})</h3>
        </div>
        <div className="container-carrito__productos">
          <div className="container-carrito__producto">
            {data.map((dato) => (
              <ProductoCarrito
                datos={dato}
                funcion1={quitar}
                key={dato.id_PR}
              />
            ))}
          </div>
        </div>
        <div className="container-carrito__direccion">
          <div className="container-carrito_dir">
            <h3>Direccion de envio</h3>
            <p>{dataUser.direccion_C} </p>
            <p>col.{dataUser.colonia_C}</p>
            <p>C.P {dataUser.cp_C}</p>
          </div>
          <div className="container-carrito_total">
            <h3>Total De productos</h3>
            <h3>{"$" + Total}</h3>
          </div>
        </div>
        <div className="container-carrito_botonComprar">
          {/* <button>Comprar</button> */}

          <Product datos={data} />
        </div>
      </div>
    </div>
  );
};

export default Carrito;
