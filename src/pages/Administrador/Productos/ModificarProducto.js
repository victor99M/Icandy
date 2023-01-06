import styled from "styled-components";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Campo from "../../../components/Campo";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import updateProductos from "services/updateProductos";
//import PubSub from "pubsub-js";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";

let arre = [];
const ModificarProducto = ({
  modalModificarProducto,
  setModalModificarProducto,
  addProducto,
  setAddProducto,
  idProducto,
  poderosoJson,
  register,
  handleSubmit,
  errors,
  reset,
}) => {
  const [unidad, setUnidad] = useState("");
  const [jeison, setJeison] = useState([]);

  const [lades, setLades] = useState("");

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

  const onSubmit = (infoMod) => {
    infoMod.id_PR = idProducto;

    updateProductos(infoMod).then((response) => {
      if (response) {
        correcto("Producto actualizado");
        //setAddProducto(!addProducto);
      } else {
        error("Ocurrió un error al actualizar");
      }
    });

    setModalModificarProducto(false);
  };

  const tipounidad = (event) => setUnidad(event.target.value);
  const handleChange = (event) => {
    setLades(event.target[9].value);
  };

  useEffect(() => {
    // setLaid(idProducto);
    if (Array.isArray(poderosoJson)) {
      setJeison(poderosoJson);
    } else {
      //alert("no soy gg");
    }
  }, [idProducto, reset]);

  return (
    <Modal
      ventanaModal={modalModificarProducto}
      setVentanaModal={setModalModificarProducto}
      encabezado={true}
      titulo="Modificar producto"
    >
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Campo
          register={register}
          name="nombre"
          nombreCampo="Nombre:"
          //error={errors.nombre}

          // value={jeison[1]}
          defaultValue={jeison[1]}
        />
        <Campo
          register={register}
          name="precio_inversion"
          nombreCampo="Precio inversión:"
          defaultValue={jeison[4]}
          //defaultValue={jeison[4]}
        />
        <Campo
          register={register}
          name="cantidad"
          nombreCampo="Cantidad:"
          type="number"
          defaultValue={jeison[2]}
          //  defaultValue={jeison[2]}
        />
        <Campo
          register={register}
          name="precio_publico"
          nombreCampo="Precio público:"
          defaultValue={jeison[3]}
          //  defaultValue={jeison[3]}
        />
        <Descripcion>
          <Texto>
            No disponible:
            <input
              name="disponibilidad"
              type="checkbox"
              {...register("disponibilidad", { required: false })}
            ></input>
          </Texto>
        </Descripcion>

        <Descripcion>
          <Texto>
            Novedad:
            <input
              type="checkbox"
              name="novedad"
              {...register("novedad", { required: false })}
            ></input>
          </Texto>
        </Descripcion>

        <Descripcion>
          <Texto>Unidad peso:</Texto>

          <MiSelect
            name="unidadPeso_PR"
            {...register("unidadPeso_PR", { required: false })}
            onChange={tipounidad}
            value={jeison[8]}
          >
            <option value="Caja">Caja</option>
            <option value="Gramos">Gramos</option>
          </MiSelect>
        </Descripcion>
        <Campo
          register={register}
          name="piezasCaja_PR"
          nombreCampo={unidad || "Caja"}
          defaultValue={jeison[9]}
        />
        <Descripcion>
          <Texto>Descripción</Texto>
          <MiArea
            //register={register}
            name="descripcion_pro"
            nombreCampo="Descripcion:"
            rows="7"
            cols="20"
            onChange={handleChange}
            defaultValue={jeison[5]}
            // onChange={handleChange}
            {...register("descripcion_pro", { required: false })}
          />
        </Descripcion>
        <Descripcion>
          <Texto>Seleccionar imagen:</Texto>
          <MiImagen
            src={
              jeison[10] != ""
                ? jeison[10]
                : "data:image/png;base64,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"
            } //{jeison[10]} //"data:image/png;base64,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"
            height="30%"
            width="30%"
          />
          <input type="file" />
        </Descripcion>
        <ButtonContainer>
          <Button>Modificar producto</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default ModificarProducto;

const Descripcion = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  left: 2.5%;
`;
const DescripcionImagen = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  left: 2.5%;
  align-items: center;
`;
const Texto = styled.label`
  content-box: border-box;
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  color: black;
  text-align: left;
  border: none;
  width: 100%;
`;

const MiArea = styled.textarea`
  content-box: border-box;
  font-size: 16px;
  margin-bottom: -2px;
  width: 90%;
  height: 50%;
`;

//border: none;
const MiSelect = styled.select`
  width: 80%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;

  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Container = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
  width: 85%;
  height: 700px;
  align-self: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 95%;
`;

const MiImagen = styled.img`
  width: 110px;
  height: 110px;
  margin-left: 25%;
`;
