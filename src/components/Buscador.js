import styled from "styled-components";
import searchSvg from "assets/Img/search.png";
import getProductos from "services/getProductos";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Link } from "react-router-dom";

const handleSearch = (e) => e.preventDefault();

const Buscador = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  const handleWordChanging = useDebouncedCallback((searchInfo) => {
    setKeyword(searchInfo.target.value);
  }, 500);

  const handleSearchFocus = () => {
    setSearchBarFocus(true);
  };

  const handleSearchBlur = () => {
    if (!keyword) setSearchBarFocus(false);
  };

  const handleSearchClick = () => {
    setSearchBarFocus(false);
  };

  useEffect(() => {
    if (keyword != "") {
      setLoading(true);
      getProductos().then((response) => {
        let productosAux;
        productosAux = response.filter((producto) => {
          return producto.nombre_PR
            .toLowerCase()
            .includes(keyword.trim().toLowerCase());
        });
        setResults([...productosAux]);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [keyword]);

  return (
    <Container onFocus={handleSearchFocus} onBlur={handleSearchBlur}>
      <div></div>
      <Search onSubmit={handleSearch}>
        <Input onChange={handleWordChanging} placeholder="Buscar"></Input>
        <Button onSubmit={handleSearch}>
          <img alt="svgImg" src={searchSvg} />
        </Button>
        {searchBarFocus && (
          <ResultsContainer>
            {!loading ? (
              results.length ? (
                results.map((producto) => (
                  <Link
                    to={`/detalles/${producto.id_PR}`}
                    className="search-result-item"
                    key={producto.nombre_PR}
                    onClick={handleSearchClick}
                  >
                    {producto.nombre_PR}
                  </Link>
                ))
              ) : (
                <p className="search-result-false">Sin coincidencias</p>
              )
            ) : (
              <p className="search-result-false">Cargando...</p>
            )}
          </ResultsContainer>
        )}
      </Search>
    </Container>
  );
};

export default Buscador;

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
    position: relative;
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

const ResultsContainer = styled.div`
  width: 80%;
  min-height: 40px;
  max-height: 150px;
  overflow: auto;
  background: white;
  position: absolute;
  z-index: 9999;
  top: 100%;
  right: 13.7%;
  box-sizing: border-box;
  border: 1px solid #000;
`;
