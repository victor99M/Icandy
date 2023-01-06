import styled from "styled-components";

const NavAdminContainer = ({ children }) => {
	return <NavAdmin>{children}</NavAdmin>;
};

const NavAdmin = styled.nav`
	display: flex;
	width: 210px;
	
	height: 100vh;
	justify-self: start;
	flex-direction: column;
	background: #0777d9;
	box-shadow: 15px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 0px 25px 25px 0px;
`;

export default NavAdminContainer;
