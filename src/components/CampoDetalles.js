import styled from "styled-components";

const CampoDetalles = ({ nombre, dato, width }) => {
	return (
		<P width={width}>
			{nombre}
			<span className={`estado_${dato}`}>{dato}</span>
		</P>
	);
};

export default CampoDetalles;

const P = styled.p`
	& {
		flex-basis: ${(props) => props.width || "50%"};
		text-align: left;
		font-size: 0.65em;
		color: black;
		font-weight: bold;
	}

	span {
		font-weight: normal;
		font-size: 1em;
	}
`;
