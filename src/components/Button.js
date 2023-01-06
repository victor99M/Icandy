import styled from "styled-components";

const Button = ({ children, onClick, onSubmit }) => {
	return (
		<Btn onClick={onClick} onSubmit={onSubmit}>
			{children}
		</Btn>
	);
};

const Btn = styled.button`
	&& {
		background: #5790ff;
		color: white;
		font-size: 18px;
		border: none;
		padding: 6px;
		cursor: pointer;
	}

	&:active {
		background: #021e73;
	}
`;

export default Button;
