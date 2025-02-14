import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function CharacterDetail({
  selectedId,
  onAddFavourite,
  isAddToFavourite,
}) {
  const [character, setCharacter] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setIsloading(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );

        // setEpisodes(Array.isArray(episodeData)?episodeData.slice(0,6):[episodeData]);
        setEpisodes([episodeData].flat().slice(0, 6));
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
      <CharacterSubInfo
        character={character}
        onAddFavourite={onAddFavourite}
        isAddToFavourite={isAddToFavourite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

function CharacterSubInfo({ character, onAddFavourite, isAddToFavourite }) {
  return (
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
          {isAddToFavourite ? (
            <p>Already added to favourites✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourite(character)}
            >
              Add to favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episodes:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode}
              <strong> : {item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
