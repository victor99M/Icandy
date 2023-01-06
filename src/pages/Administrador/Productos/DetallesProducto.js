import styled from "styled-components";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Campo from "../../../components/Campo";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

let arre = [];
const DetallesProducto = ({
  modalDetallesProducto,
  setModalDetallesProducto,
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
  const [laid, setLaid] = useState(idProducto);
  const [jeison, setJeison] = useState([]);

  const onSubmit = (infoMod) => {
    const myModJSON = JSON.stringify(infoMod);
    setModalDetallesProducto(false);
  };

  const tipounidad = (event) => setUnidad(event.target.value);

  useEffect(() => {
    // setLaid(idProducto);
    // setJeison(poderosoJson);

    if (Array.isArray(poderosoJson)) {
      //alert("hola bb");
      setJeison(poderosoJson);
      //setLades(jeison[5]);
    }
  }, [idProducto, reset]);

  return (
    <Modal
      ventanaModal={modalDetallesProducto}
      setVentanaModal={setModalDetallesProducto}
      encabezado={true}
      titulo="Detalles producto"
    >
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Campo
          register={register}
          name="nombre"
          nombreCampo="Nombre:"
          //error={errors.nombre}
          defaultValue={jeison[1]}
        />
        <Campo
          register={register}
          name="precio_inversion"
          nombreCampo="Precio inversión:"
          defaultValue={jeison[4]}
        />
        <Campo
          register={register}
          name="cantidad"
          nombreCampo="Cantidad:"
          type="number"
          defaultValue={jeison[2]}
          // error={errors.nombre}
        />
        <Campo
          register={register}
          name="precio_publico"
          nombreCampo="Precio público:"
          defaultValue={jeison[3]}
          //  error={errors.nombre}
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
            selected={jeison[8]}
          >
            <option value="Caja">Caja</option>
            <option value="Gramos">Gramos</option>
          </MiSelect>
        </Descripcion>
        <Campo
          register={register}
          name="piezasCaja_PR"
          nombreCampo={unidad || "Caja"}
        />
        <Descripcion>
          <Texto>Descripción</Texto>
          <MiArea
            //register={register}
            name="descripcion_pro"
            //nombreCampo="Descripcion:"
            rows="7"
            cols="20"
            defaultValue={jeison[5]}
            {...register("descripcion_pro", { required: false })}
            disabled
          />
        </Descripcion>
        <Descripcion>
          <Texto>Imagen:</Texto>
          <MiImagen
            className="foto_PR"
            src={jeison[10]}
            height="30%"
            width="30%"
          />
        </Descripcion>
      </Container>
    </Modal>
  );
};

export default DetallesProducto;

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
  width: 130px;
  height: 130px;
  margin-left: 25%;
`;
