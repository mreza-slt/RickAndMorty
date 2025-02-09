import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../data/data";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function CharacterDetail({ selectedId }) {
  const [character, setCharacter] = useState(null);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setIsloading(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );

        setCharacter(data);
      } catch (error) {
        setCharacter(null);
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }

    if (selectedId) fetchCharacter();
  }, [selectedId]);

  if (isloading) {
    return (
      <div style={{ flex: 1, textAlign: "center" }}>
        <Loading />
      </div>
    );
  }

  if (!character || !selectedId) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        please select a character...
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span style={{ color: "red" }}>
              {character.gender === "Male" ? "🤵" : "🙎"}
            </span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span> - &nbsp;{character.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{character.location?.name || "Unknown"}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favourite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {item.episode}
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
