import styled from "styled-components";

const Modal = ({
	children,
	ventanaModal,
	setVentanaModal,
	titulo = "Alerta",
	encabezado = false,
}) => {
	return (
		<>
			{ventanaModal && (
				<Overlay>
					<ContenedorModal>
						{encabezado && (
							<EncabezadoModal>
								<h3>{titulo}</h3>
							</EncabezadoModal>
						)}
						<BotonCerrar onClick={() => setVentanaModal(false)}>X</BotonCerrar>
						{children}
					</ContenedorModal>
				</Overlay>
			)}
		</>
	);
};

export default Modal;

const Overlay = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5000;
`;

const ContenedorModal = styled.div`
	min-width: 70vw;
	max-width: 70vw;
	min-height: 70vh;
	max-height: 80vh;
	background: #fff;
	position: relative;
	border-radius: 5px;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const EncabezadoModal = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 25px;
	padding-bottom: 10px;
	border-bottom: 1px solid #000;

	h3 {
		font-weigth: 500;
		font-size: 28px;
		color: #1766dc;
		padding: 0;
		margin: 0;
	}
`;

const BotonCerrar = styled.button`
	position: absolute;
	top: 26px;
	right: 20px;
	width: 30px;
	heigth: 30px;
	background: none;
	border: none;
	cursor: pointer;
	transition: 0.3s background, 0.8s color;
	border-radius: 5px;
	color: #1766dc;
	font-size: 20px;

	&:hover {
		background: #f2f2f2;
		color: red;
	}
`;
