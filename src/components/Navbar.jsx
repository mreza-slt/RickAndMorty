import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Character } from "./CharacterList";
import { useState } from "react";
import Modal from "./Modal";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      {children}
    </nav>
  );
}

export function Logo() {
  return <div className="navbar__logo">LOGO</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} charecters</div>;
}

export function Favourites({ favourites, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="list of favourites" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
