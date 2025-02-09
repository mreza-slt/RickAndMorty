import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch then() catch() //

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("something went wrong!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 6));
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);

  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // fetch async await

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       if (!res.ok) {
  //         throw new Error("something went wrong!");
  //       }
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 3));
  //       // setIsLoading(false);
  //     } catch (err) {
  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // axios async await //

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );

        setCharacters(data.results.slice(0, 3));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // axios then() catch()//

  //   useEffect(() => {
  //   setIsLoading(true);
  //   axios.get("https://rickandmortyapi.com/api/character")
  //     .then(({data}) => {
  //       setCharacters(data.results.slice(0, 6));
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="app">
          <Toaster />
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
