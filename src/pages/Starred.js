import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Starred = () => {
  let starredArray = [];

  if (Cookies.get("starred")) {
    const cookieRead = Cookies.get("starred");
    starredArray = JSON.parse(cookieRead);
    console.log(starredArray);
  }

  return (
    <div className="characters-main">
      <div className="characters-grid">
        <h1>Favoris</h1>
        {starredArray.map((element, index) => {
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
                      starredArray.splice(index, 1);
                      const cookieArray = JSON.stringify(starredArray);
                      Cookies.set("starred", cookieArray, {
                        expires: 30,
                        SameSite: "Lax",
                      });
                      window.location.reload();
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
      <div className="starred-delete-button">
        {starredArray.length > 0 && (
          <button
            onClick={() => {
              starredArray = [];
              const cookieArray = JSON.stringify(starredArray);
              Cookies.set("starred", cookieArray, {
                expires: 30,
                SameSite: "Lax",
              });
              window.location.reload();
            }}
          >
            Effacer tous vos favoris
          </button>
        )}
      </div>
    </div>
  );
};

export default Starred;
