import "./styles.css";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import axios from "axios";
import endpoints from "endpoints";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import logo from "assets/Img/logo.png";

// import ScriptTag from "react-script-tag";

const Recuperar = () => {
  //   <ScriptTag src="https://www.google.com/recaptcha/api.js" async defer />;
  const [correo, setCorreo] = useState("");

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

  async function request_Password(e) {
    e.preventDefault();
    let fd_login = new FormData();

    fd_login.append("correo", correo);

    // Funciona (en este no se usa el addUserRegistrar.js)
    const res = await axios.post(
      endpoints.recuperarContrasenaCliente,
      fd_login
    );

    // alert("Respuesta: " + res.data);

    if (res.data == "Uno") {
      //alert("Respuesta: " + res.data);
      correcto("iCandy te envió un correo para recuperar tu contraseña");
      navigate("/login");
    } else {
      error("Ocurrió un error, intentalo más tarde.");
      //alert(res.data);
      //alert("Respuesta: " + res.data);
    }
  }

  return (
    <div className="div-contenedor-recuperar">
      <div className="div-fondo-recuperar"></div>
      <a href="/">
        <img className="logo-logo" src={logo} alt="logo" />
      </a>
      <div className="div-form-recuperar">
        <h1>Recuperar contraseña</h1>
        <form method="post">
          <div className="txt_info">
            <input
              type="text"
              required
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span></span>
            <label>Correo electrónico:</label>
          </div>
          {/* <div className="captcha-container">
            <div
              className="g-recaptcha"
              data-sitekey="6LdSnkcfAAAAABp3MDj27-hm5K0uMGYWD1GRk7Ow"
            >
              <Helmet>
                <script
                  src="https://www.google.com/recaptcha/api.js"
                  async
                  defer
                />
              </Helmet>
            </div>
          </div> */}
          <button
            className="btn-recuperar"
            type="submit"
            onClick={(e) => request_Password(e)}
          >
            Continuar
          </button>
          <h3 className="espacio">Recuperar contraseña</h3>
        </form>
      </div>
    </div>
  );
};

export default Recuperar;
