import "./StylesConfirmar.css";

const Confirmar = () => {
  return (
    <div className="div-contenedor-confirmar">
      <div className="div-fondo-confirmar"></div>
      <div className="div-form-confirmar">
        <h2>Restablecer contraseña</h2>
        <form method="post">
          <div className="txt_info">
            <input type="password" required />
            <span></span>
            <label>Contraseña nueva:</label>
          </div>
          <div className="txt_info">
            <input type="password" required />
            <span></span>
            <label>Confirmar contraseña:</label>
          </div>
          {/* <div className="container-btn-confirmar"> */}
          <input className="btn-confirmar" type="submit" value="Confirmar" />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Confirmar;
