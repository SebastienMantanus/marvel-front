import { Link } from "react-router-dom";

const Starred = ({ SetStarred, starred }) => {
  console.log(starred);

  return (
    <div className="characters-main">
      <div className="characters-grid">
        <h1>Favoris</h1>
        {starred.map((element, index) => {
          return (
            <div className="starred-list" key={index}>
              <div>
                <img src={element.thumbnail} alt={element.name} />
              </div>
              <div className="starred-details">
                <div>
                  <h2>{element.name}</h2>
                  <p>{element.type}</p>
                  <p>{element.description}</p>
                </div>
                <div>
                  {element.type === "character" && (
                    <Link to={`/character/${element.id}`}>
                      <p>Aller sur le fiche du personnage</p>
                    </Link>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => {
                      const array = [...starred];
                      array.splice(index, 1);
                      SetStarred(array);
                    }}
                  >
                    Retirer des faforis
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          SetStarred([]);
        }}
      >
        Effacer
      </button>
    </div>
  );
};

export default Starred;
