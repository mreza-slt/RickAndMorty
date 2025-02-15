import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, {
  Favourites,
  Logo,
  Search,
  SearchResult,
} from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("FAVOURITES");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );

        setCharacters(data.results.slice(0, 6));
      } catch (err) {
        if (!err.__CANCEL__) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  }, [favourites]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    // setFavourites([...favourites,char]) // method 1
    setFavourites((prevFav) => [...prevFav, char]); // method 2
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <div className="navbar-part">
          <Logo />
          <Search query={query} setQuery={setQuery} />
        </div>
        <div className="navbar-part">
          <SearchResult numOfResult={characters.length} />
          <Favourites
            favourites={favourites}
            onDeleteFavourite={handleDeleteFavourite}
          />
        </div>
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        >
          {
            <CharacterDetail
              selectedId={selectedId}
              onAddFavourite={handleAddFavourite}
              isAddToFavourite={isAddToFavourite}
            />
          }
        </CharacterList>
        <div className="character-detail__medium">
          <CharacterDetail
            selectedId={selectedId}
            onAddFavourite={handleAddFavourite}
            isAddToFavourite={isAddToFavourite}
          />
        </div>
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
