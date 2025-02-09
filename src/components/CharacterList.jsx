import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";
export default function CharacterList({ characters, isLoading,onSelectCharacter,selectedId }) {
  return (
    <div className="characters-list">
      {isLoading && <Loading />}

      {characters.map((item) => (
        <Character key={item.id} item={item} onSelectCharacter={onSelectCharacter} selectedId={selectedId}/>
      ))}
    </div>
  );
}

function Character({ item ,onSelectCharacter,selectedId}) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={()=>onSelectCharacter(item.id)}>
      {selectedId===item.id?<EyeSlashIcon/>:<EyeIcon />}
        
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span style={{ color: "red" }}>
      {item.gender === "Male" ? "🤵" : "🙎"}
      </span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
