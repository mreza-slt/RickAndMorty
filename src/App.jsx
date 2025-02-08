import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loading from "./components/Loading";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 6)));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results.slice(0, 3));
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="app">
          <Navbar>
            <SearchResult numOfResult={characters.length} />
          </Navbar>
          <Main>
            <CharacterList characters={characters} />
            <CharacterDetail />
          </Main>
        </div>
      )}
    </>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
