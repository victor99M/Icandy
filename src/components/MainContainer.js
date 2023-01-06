import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainContainer = ({ children, session, setSession }) => {
	const navigate = useNavigate();

	const handleCloseSession = (e) => {
		window.localStorage.setItem("loggedUser", "");
		setSession(!session);
		navigate("/");
	};

	return (
		<Container>
			{children}
			<Button onClick={handleCloseSession}>Cerrar Sesión</Button>
		</Container>
	);
};

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	font-size: calc(10px + 2vmin);
	position: relative;
`;

const Button = styled.button`
	&& {
		background: #0777d9;
		color: white;
		font-size: 16px;
		border: none;
		padding: 6px;
		cursor: pointer;
		position: absolute;
		top: 25px;
		right: 25px;
		border-radius: 15px;
	}

	&:active {
		background: #021e73;
	}
`;

export default MainContainer;
