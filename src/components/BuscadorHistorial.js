import styled from "styled-components";
import searchSvg from "assets/Img/search.png";

const handleSearch = (e) => {
	e.preventDefault();
};

const BuscadorHistorial = ({ keyword }) => {
	const handleChange = (e) => {
		keyword(e.target.value);
	};

	return (
		<Container>
			<div></div>
			<Search onSubmit={handleSearch}>
				<Input onChange={handleChange} placeholder="Buscar"></Input>
				<Button onSubmit={handleSearch}>
					<img alt="svgImg" src={searchSvg} />
				</Button>
			</Search>
		</Container>
	);
};

export default BuscadorHistorial;

const Container = styled.div`
	& {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: space-around;
		align-items: center;
		position: relative;
	}
`;

const Search = styled.form`
	& {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		flex-shrink: 1;
	}
`;

const Input = styled.input`
	& {
		font-size: 1em;
		width: 83%;
		height: 100%;
		box-sizing: border-box;
		padding: 13px;
		margin: 0;
		border: 2px solid #3f423f;
		border-radius: 15px 0 0 15px;
		backdrop-filter: blur(4px);
	}

	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	& {
		border: none;
		cursor: pointer;
		box-sizing: border-box;
		margin: 0;
		border: 2px solid #3f423f;
		border-left: none;
		border-radius: 0 15px 15px 0;
		background: white;
		backdrop-filter: blur(4px);
		width: 10.1%;
		height: 100%;
		padding: 0;
	}

	&:active {
		background: #ccc;
	}

	img {
		object-fit: cover;
		width: 50%;
	}
`;
