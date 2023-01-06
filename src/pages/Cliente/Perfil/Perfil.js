import "./perfilStyles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import endpoints from "endpoints";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";

const Perfil = ({ userData, type = false }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState();
  const [direccion, setDireccion] = useState("");
  const [colonia, setColonia] = useState("");
  const [cp, setCp] = useState();
  const [password, setPassword] = useState("");
  const [auxpassword, setAuxpassword] = useState("");
  const [foto, setFoto] = useState("");

  const navigate = useNavigate();

  const correcto = (mensaje) => {
    toast.success(mensaje, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };
  const error = (mensaje) => {
    toast.error(mensaje, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  const loca_URL = "http://localhost/icandy/API/";

  async function getPerfil() {
    // e.preventDefault();
    let fd_login = new FormData();

    fd_login.append("id_C", userData.id_C);

    // Funciona (en este no se usa el addUserRegistrar.js)
    const res = await axios.post(endpoints.getPerfilUsuario, fd_login);

    if (res.data != null) {
      setNombre(res.data.nombre_C);
      setApellido(res.data.apellidos_C);
      setCorreo(res.data.correo_C);
      setTelefono(res.data.telefono_C);
      setDireccion(res.data.direccion_C);
      setColonia(res.data.colonia_C);
      setCp(res.data.cp_C);
      setFoto(res.data.foto_C);
    } else {
      error("Ocurrió un error. Intentalo más tarde");
    }
  }

  async function editarPerfil(e) {
    e.preventDefault();
    let fd_update = new FormData();

    fd_update.append("id", userData.id_C);

    fd_update.append("nombre", nombre);
    fd_update.append("apellido", apellido);
    fd_update.append("direccion", direccion);
    fd_update.append("colonia", colonia);
    fd_update.append("cp", cp);
    fd_update.append("correo", correo);
    fd_update.append("telefono", telefono);

    // Funciona (en este no se usa el addUserRegistrar.js)
    const respuesta = await axios.post(
      endpoints.updatePerfilCliente,
      fd_update
    );

    if (respuesta.data == "1") {
      correcto("¡Perfil actualizado!");
    } else {
      error("Ocurrió un error al editar perfil.");
      window.location.href = window.location.href;
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    let fd_password = new FormData();

    fd_password.append("id", userData.id_C);

    fd_password.append("password", password);

    const respuestaPass = await axios.post(
      endpoints.updateClientePassword,
      fd_password
    );

    if (respuestaPass.data == "1") {
      correcto("¡Actualizaste tu contraseña!");
      setAuxpassword("");
    } else {
      error("Ocurrió un error al cambiar la contraseña.");
      // window.location.href = window.location.href;
    }
  }

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <div className="contenedor-perfil">
      {!type ? (
        <div className="perfil-filtros">
          <p>
            <Link to="/miPerfil">Usuario</Link>
          </p>
        </div>
      ) : null}
      <div className={`div-contenedor-perfil ${type ? "perfil-admin" : null}`}>
        <div className={`div-form-perfil ${type ? "perfil-admin" : null}`}>
          {!type && <h2>Mi perfil</h2>}
          <form encType="multipart/form-data" method="POST">
            <div className="div_img_cliente">
              <img
                className="img_cliente"
                // src="https://iteragrow.com/wp-content/uploads/2018/04/buyer-persona-e1545248524290.jpg"
                //src={`http://localhost/icandy/API/` + foto}
                //src={`https://icandymx.xyz/icandy/API/` + foto} https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-imagen-de-perfil-del-hombre-de-negocios-avatar.jpg?ver=6

                src={
                  foto != ""
                    ? `https://icandymx.xyz/icandy/API/` + foto
                    : "https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-imagen-de-perfil-del-hombre-de-negocios-avatar.jpg?ver=6"
                }
              ></img>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                required
                /* Prueba */
                className="nombre"
                name="nombre"
                defaultValue={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <span></span>
              <label>Nombre(s):</label>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                defaultValue={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
              <span></span>
              <label>Apellido(s):</label>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                defaultValue={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <span></span>
              <label>Email:</label>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                defaultValue={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              <span></span>
              <label>Telefono:</label>
            </div>
            <div className="txt_dato_div caca">
              <input
                type="text"
                defaultValue={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              <span></span>
              <label>Calle:</label>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                defaultValue={colonia}
                onChange={(e) => setColonia(e.target.value)}
                required
              />
              <span></span>
              <label>Colonia:</label>
            </div>
            <div className="txt_dato_div">
              <input
                type="text"
                defaultValue={cp}
                onChange={(e) => setCp(e.target.value)}
                required
              />
              <span></span>
              <label>CP:</label>
            </div>

            <button
              className="btn-act-perfil"
              type="submit"
              onClick={(e) => editarPerfil(e)}
            >
              Guardar
            </button>
          </form>
          <form>
            <br></br>
            <br></br>
            <h2>Cambio de contraseña</h2>
            <div className="txt_dato_div">
              <input
                type="password"
                defaultValue={auxpassword}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span></span>
              <label>Contraseña</label>
            </div>
            <div className="txt_dato_div">
              <input type="password" defaultValue={auxpassword} required />
              <span></span>
              <label>Confirmar contraseña:</label>
            </div>
            <div className="txt_dato_div_otro"></div>
            <button
              className="btn-act-perfil"
              type="submit"
              onClick={(e) => changePassword(e)}
            >
              Cambiar
            </button>
          </form>
        </div>
        {/* <img src="C:/xampp/htdocs/icandy/API/clientes/new_product.png"></img> */}
      </div>
    </div>
  );
};

export default Perfil;
