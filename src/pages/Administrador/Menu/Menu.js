import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import getCliente from "services/getCliente";
const Menu = () => {
  const id_usuario = {};

  let user = {};
  const { pathname } = useLocation();
  const userJson = window.localStorage.getItem("loggedUser");
  const [dataUser, setDatauser] = useState([]);
  const [foto, setFoto] = useState("");

  if (userJson) {
    user = JSON.parse(userJson);
    id_usuario.id_cliente = user.id_C;
  }

  useEffect(() => {
    if (userJson) {
      getCliente(id_usuario).then((response) => {
        if (response) {
          response.map((usuario) => {
            setDatauser(usuario);
            // setFoto(dataUser.foto_C);
          });
        } else {
        }
      });
    } else {
    }
  }, []);
  return (
    <>
      <div className="nav-admin-perfil">
        <div className="contendor_foto_admin">
          <div className="rombo">
            <img
              src={
                dataUser.foto_C != ""
                  ? `https://icandymx.xyz/icandy/API/` + dataUser.foto_C
                  : "https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-imagen-de-perfil-del-hombre-de-negocios-avatar.jpg?ver=6"
              }
              alt=""
            />
          </div>
        </div>
        <p>
          {dataUser.nombre_C + " "}
          {dataUser.apellidos_C}
        </p>
      </div>
      <div className="nav-admin-links">
        <Link
          to="/"
          className={`nav-admin-links-item ${
            pathname === "/" && "nav-admin-links-focus"
          }`}
        >
          Inicio
        </Link>
        <Link
          to="/productos"
          className={`nav-admin-links-item ${
            pathname === "/productos" && "nav-admin-links-focus"
          }`}
        >
          Productos
        </Link>
        <Link
          to="/surtir_productos"
          className={`nav-admin-links-item ${
            pathname === "/surtir_productos" && "nav-admin-links-focus"
          }`}
        >
          Surtir productos
        </Link>
        <Link
          to="/usuarios"
          className={`nav-admin-links-item ${
            pathname === "/usuarios" && "nav-admin-links-focus"
          }`}
        >
          Usuarios
        </Link>
        <Link
          to="/caja"
          className={`nav-admin-links-item ${
            pathname === "/caja" && "nav-admin-links-focus"
          }`}
        >
          Caja
        </Link>
        <Link
          to="/pedidos"
          className={`nav-admin-links-item ${
            pathname === "/pedidos" && "nav-admin-links-focus"
          }`}
        >
          Pedidos
        </Link>
        <Link
          to="/configuracion"
          className={`nav-admin-links-item ${
            pathname === "/configuracion" && "nav-admin-links-focus"
          }`}
        >
          Configuración
        </Link>
      </div>
    </>
  );
};

export default Menu;
