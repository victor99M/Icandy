import "./styles.css";
import { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import updateFondo from "services/updateFondo";
import addCorteCaja from "services/addCorteCaja";
import addCierreCaja from "services/addCierreCaja";
import getMonto from "services/getMonto";
import getCorteCaja from "services/getCorteCaja";

var hoy = new Date();
var fecha =
  hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

const Cortecaja = () => {
  const fondo = useRef();
  const corte = useRef();
  //monto es la cantidad de las ventas
  const [monto, setMonto] = useState(0);
  const [cortes, setCortes] = useState([]);
  const [banderacorte, setBandercorte] = useState(0);
  useEffect(() => {
    getMonto().then((response) => {
      setMonto(response);
    });
  }, []);

  useEffect(() => {
    getCorteCaja().then((response) => {
      setCortes(response);
    });
  }, [banderacorte]);

  const sendFondo = () => {
    const fondo_FC = { fondo: fondo.current.value };
    swal({
      title: "Fondo",
      text: `Esta seguro de registrar ${"$" + fondo.current.value}`,
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((respuesta) => {
      if (respuesta) {
        updateFondo(fondo_FC).then((response) => {
          if (response) {
            swal("¡Fondo Registrado con exito!", {
              icon: "success",
            });
          } else {
            swal("¡Ocurrio un error!", {
              icon: "warning",
            });
          }
        });
      }
    });
  };

  const senCorte = () => {
    const dataCorte = {};
    swal({
      title: "Corte",
      text: `Esta seguro de registrar ${"$" + corte.current.value}`,
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((respuesta) => {
      if (respuesta) {
        dataCorte.usuario = "victor";
        dataCorte.venta = monto;
        dataCorte.diferencia =
          parseInt(fondo.current.value) + monto - parseInt(corte.current.value);
        dataCorte.caja = parseInt(corte.current.value);
        addCorteCaja(dataCorte).then((response) => {
          if (response) {
            swal("¡Corte de caja realizado con exito!", {
              icon: "success",
            });
            setBandercorte(banderacorte + 1);
          } else {
            swal("¡Ocurrio un error!", {
              icon: "warning",
            });
          }
          setMonto(0);
        });
      }
    });
  };

  const sendCierre = () => {
    const usuario = {};
    swal({
      title: "Corte",
      text: `Esta seguro de cerrar caja`,
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((respuesta) => {
      usuario.id_c = 2;
      if (respuesta) {
        addCierreCaja(usuario).then((response) => {
          if (response) {
            swal("¡Corte de caja realizado con exito!", {
              icon: "success",
            });
            setBandercorte(banderacorte + 1);
          } else {
            swal("¡Ocurrio un error!", {
              icon: "warning",
            });
          }
        });
      }
    });
  };

  return (
    <div className="corteCaja-contenedor">
      <div className="corteCaja-opciones">
        <div className="corteCaja-opciones__fecha">
          <p>Fecha:{" " + fecha}</p>
          <p>Venta: {"$ " + monto}</p>
          {/* <p>Diferencia:1200 </p> */}
        </div>
        <div className="corteCaja-opciones__Inputs">
          <div className="Input_1">
            <p>Fondo Caja</p>
            <input type="text" placeholder="Fondo Caja" ref={fondo} />
            <button onClick={sendFondo}>Registrar Fondo</button>
          </div>
          <div className="Input_2">
            <p>Corte Caja</p>
            <input type="text" placeholder="Corte Caja" ref={corte} />
            <button onClick={senCorte}>Registrar Corte</button>
          </div>
        </div>
      </div>
      <div className="corteCaja-contenedorTabla">
        <table className="Corte-tabla">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Caja</th>
              <th>Venta</th>
              <th>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {cortes.map((corte) => (
              <tr key={corte.id_corte}>
                <td>{corte.usuario_corte}</td>
                <td>{corte.fecha_corte}</td>
                <td>{corte.hora_corte}</td>
                <td>{"$" + corte.caja_corte}</td>
                <td>{"$" + corte.monto_corte}</td>
                <td>{"$" + corte.diferencia_corte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Corte-tabla-cierreCaja">
        <button onClick={sendCierre}>Cierrre de caja</button>
      </div>
    </div>
  );
};

export default Cortecaja;
