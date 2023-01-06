import "../Usuarios/styles.css";
import Button from "components/Button";
import getProductosInventario from "services/getProductosInventario";
import { useEffect, useState } from "react";
import RegistrarProducto from "./RegistrarProducto";
import ModificarProducto from "./ModificarProducto";
import DetallesProducto from "./DetallesProducto";
import Table from "components/Table";
import AdminBuscador from "components/AdminBuscador";
import React, { Component } from "react";
import delProductos from "services/delProductos";
import { useForm } from "react-hook-form";
import { FormState } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "./styles.css";

//import PubSub from "pubsub-js";

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

const CAMPOS = [
	"ID",
	"Producto",
	"Cantidad",
	"Precio",
	"Modificar",
	"Eliminar",
	"Detalles",
];

const eliminar = (e) => {
	delProductos(e.target.className).then((response) => {
		if (response) {
			correcto("El producto se elimino");
		} else {
			error("Ocurrió un error al eliminar");
		}
	});
};

const Productos = () => {
	const [modalProducto, setModalProducto] = useState(false);
	const [productos, setProductos] = useState([]);
	const [search, setSearch] = useState("");
	const [addProducto, setAddProducto] = useState(false);

	const [idProducto, setIdProducto] = useState(0);
	const [poderosoJson, setPoderosoJson] = useState({});

	//Modificar producto
	const [modalModificarProducto, setModalModificarProducto] = useState(false);
	const [modalDetallesProducto, setModalDetallesProducto] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	//Funcion para modal de modificar
	const handleUpdate = (e) => {
		//const id = e.target.className;

		const find = productos.find(
			(producto) => producto.id_PR === e.target.className
		);

		setIdProducto(e.target.className);

		reset({
			nombre: find.nombre_PR,
			precio_inversion: find.inversion_PR,
			cantidad: find.cantidad_PR,
			precio_publico: find.precio_PR,
			unidadPeso_PR: find.unidadPeso_PR,
			piezasCaja_PR: find.piezasCaja_PR,
			descripcion_pro: find.descripcion_PR,
		});

		setModalModificarProducto(!modalModificarProducto);
		setPoderosoJson(Object.values(find));

		// PubSub.publish("saludo", Object.values(find));
	};

	const handleAdd = () => {
		setModalProducto(!modalProducto);
	};

	const handleDetal = (e) => {
		const find = productos.find(
			(producto) => producto.id_PR === e.target.className
		);

		reset({
			nombre: find.nombre_PR,
			precio_inversion: find.inversion_PR,
			cantidad: find.cantidad_PR,
			precio_publico: find.precio_PR,
			unidadPeso_PR: find.unidadPeso_PR,
			piezasCaja_PR: find.piezasCaja_PR,
			descripcion_pro: find.descripcion_PR,
			foto_PR: find.foto_PR,
		});

		setIdProducto(e.target.className);
		setModalDetallesProducto(!modalModificarProducto);
		setPoderosoJson(Object.values(find));
	};

	useEffect(() => {
		getProductosInventario().then((response) => setProductos(response));
	}, [productos]);

	const nuevas_propiedades = productos.map((producto) => ({
		id_PR: producto.id_PR,
		nombre_PR: producto.nombre_PR,
		cantidad_PR: producto.cantidad_PR,
		precio_PR: producto.precio_PR,
	}));

	return (
		<>
			<AdminBuscador keyword={setSearch} />
			<Table
				campos={CAMPOS}
				datos={Object.values(nuevas_propiedades)}
				filtro="nombre_PR"
				search={search}
				tipo={2}
				funciones={[handleUpdate, eliminar, handleDetal]} //modificar, eliminar, detalles
			/>

			<div className="contenedor-button">
				<Button onClick={handleAdd}>Agregar producto</Button>
			</div>

			<RegistrarProducto
				modalProducto={modalProducto}
				setModalProducto={setModalProducto}
				addProducto={addProducto}
				setAddProducto={setAddProducto}
			/>

			<ModificarProducto
				modalModificarProducto={modalModificarProducto}
				setModalModificarProducto={setModalModificarProducto}
				addProducto={addProducto}
				setAddProducto={setAddProducto}
				idProducto={idProducto}
				poderosoJson={poderosoJson}
				register={register}
				handleSubmit={handleSubmit}
				errors={errors}
				reset
			/>
			<DetallesProducto
				modalDetallesProducto={modalDetallesProducto}
				setModalDetallesProducto={setModalDetallesProducto}
				addProducto={addProducto}
				setAddProducto={setAddProducto}
				idProducto={idProducto}
				poderosoJson={poderosoJson}
				register={register}
				handleSubmit={handleSubmit}
				errors={errors}
				reset
			/>
			<ToastContainer></ToastContainer>
		</>
	);
};

export default Productos;
