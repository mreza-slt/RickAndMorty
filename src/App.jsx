import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters} />
      </div>
    </div>
  );
}

export default App;
