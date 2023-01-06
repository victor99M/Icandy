import styled from "styled-components";

const handleSearch = (e) => {
	e.preventDefault();
};

const AdminBuscador = ({ keyword }) => {
	const handleChange = (e) => {
		keyword(e.target.value);
	};

	return (
		<Container>
			<Search onSubmit={handleSearch}>
				<Input onChange={handleChange} placeholder="Buscar"></Input>
				<Button onSubmit={handleSearch}>
					<img
						alt="svgImg"
						src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDEzIDMgQyA3LjQ4ODk5NzEgMyAzIDcuNDg4OTk3MSAzIDEzIEMgMyAxOC41MTEwMDMgNy40ODg5OTcxIDIzIDEzIDIzIEMgMTUuMzk2NTA4IDIzIDE3LjU5NzM4NSAyMi4xNDg5ODYgMTkuMzIyMjY2IDIwLjczNjMyOCBMIDI1LjI5Mjk2OSAyNi43MDcwMzEgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI2LjcwNzAzMSAyNS4yOTI5NjkgTCAyMC43MzYzMjggMTkuMzIyMjY2IEMgMjIuMTQ4OTg2IDE3LjU5NzM4NSAyMyAxNS4zOTY1MDggMjMgMTMgQyAyMyA3LjQ4ODk5NzEgMTguNTExMDAzIDMgMTMgMyB6IE0gMTMgNSBDIDE3LjQzMDEyMyA1IDIxIDguNTY5ODc3NCAyMSAxMyBDIDIxIDE3LjQzMDEyMyAxNy40MzAxMjMgMjEgMTMgMjEgQyA4LjU2OTg3NzQgMjEgNSAxNy40MzAxMjMgNSAxMyBDIDUgOC41Njk4Nzc0IDguNTY5ODc3NCA1IDEzIDUgeiI+PC9wYXRoPjwvc3ZnPg=="
					/>
				</Button>
			</Search>
		</Container>
	);
};

export default AdminBuscador;

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 15%;
	justify-content: space-around;
	align-items: center;
	position: relative;
`;

const Search = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 1;
`;

const Input = styled.input`
	font-size: 18px;
	width: 350px;
	height: 39px;
	margin: 0;
	box-sizing: border-box;
	padding: 13px;
	border: 2px solid #3f423f;
	border-radius: 15px 0 0 15px;
	backdrop-filter: blur(4px);

	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	border: none;
	cursor: pointer;
	margin: 0;
	border: 2px solid #3f423f;
	border-left: none;
	border-radius: 0 15px 15px 0;
	background: white;
	backdrop-filter: blur(4px);

	&:active {
		background: #ccc;
	}
`;
