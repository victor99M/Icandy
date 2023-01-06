import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";
import Campo from "./Campo";
import { useForm } from "react-hook-form";
import addUsuario from "services/addUsuario";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorAlert = (mensaje) => {
	toast.error(mensaje, {
		position: "bottom-left",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
	});
};

const successAlert = (mensaje) => {
	toast.success(mensaje, {
		position: "bottom-left",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
	});
};

const RegistrarUsuario = ({
	modalUsuario,
	setModalUsuario,
	addUser,
	setAddUser,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (info) => {
		if (!(info.clave == info.confirmarClave)) {
			errorAlert("Las contraseñas no coinciden");
			return;
		}
		addUsuario(info).then((response) => {
			setAddUser(!addUser);
			setModalUsuario(false);
			successAlert("Se ha creado el usuario");
		});
	};

	return (
		<>
			<Modal
				ventanaModal={modalUsuario}
				setVentanaModal={setModalUsuario}
				encabezado={true}
				titulo="Agregar usuario"
			>
				<Container onSubmit={handleSubmit(onSubmit)}>
					<Campo
						register={register}
						name="nombre"
						nombreCampo="Nombre(s)"
						error={errors.nombre}
					/>
					<Campo
						register={register}
						name="apellido"
						nombreCampo="Apellido(s)"
						error={errors.apellido}
					/>
					<Campo
						register={register}
						name="direccion"
						nombreCampo="Dirección"
						width="95%"
						error={errors.direccion}
					/>
					<Campo
						register={register}
						name="correo"
						nombreCampo="Correo electrónico"
						type="email"
						error={errors.correo}
					/>
					<Campo
						register={register}
						name="telefono"
						nombreCampo="No. teléfono"
						type="tel"
						error={errors.telefono}
					/>
					<Campo
						register={register}
						name="clave"
						nombreCampo="Contraseña"
						type="password"
						minLength={5}
						maxLength={10}
						error={errors.clave}
					/>
					<Campo
						register={register}
						name="confirmarClave"
						nombreCampo="Confirmar contraseña"
						type="password"
						minLength={5}
						maxLength={10}
						error={errors.confirmarClave}
					/>
					<ButtonContainer>
						<Button>Agregar usuario</Button>
					</ButtonContainer>
				</Container>
			</Modal>
			<ToastContainer />
		</>
	);
};

export default RegistrarUsuario;

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
