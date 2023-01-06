import "./style.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import deletCarrito from "services/deletCarrito";
import anadir_carrito from "services/anadir_carrito";
const CajaCarrito = ({ datos, funcion1 }) => {
  const Eliminar = () => {
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
    <div className="contenedor-cajaCarrito">
      <img src={datos.foto_PR} alt="" className="imagenCarrito" />

      <div className="cajaCarrito-contenedor">
        <div className="cajaCarrito-detalles">
          <button className="detalles-eliminar" onClick={Eliminar}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <p>{datos.nombre_PR}</p>
          <p className="precio">${datos.precio_PR}</p>
        </div>

        <div className="cajaCarrito-incremento">
          <button id="rojo" onClick={Quitar}>
            -
          </button>
          <div className="numeros">
            <p>{datos.cantidad_CA}</p>
          </div>
          <button id="azul" onClick={Agregar}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CajaCarrito;
