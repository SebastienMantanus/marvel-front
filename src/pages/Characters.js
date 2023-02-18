import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Characters = ({ SetStarred, starred }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pageSkip = "";
        let characterSearch = "";

        if (skip > 0) {
          pageSkip = skip;
        }
        if (search) {
          characterSearch = search;
          setSkip(0);
        }

        const response = await axios.get(
          `https://marvel--marvel--vqtmsgjlf7qx.code.run/characters?skip=${pageSkip}&name=${characterSearch}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [skip, search, starred]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="characters-main">
      {!isLoading ? (
        <div>
          <div className="title-search">
            <h1>Characters</h1>
            {data.count > 100 && (
              <p>
                Page : {skip + 1} / {Math.ceil(data.count / 100) + 1}
              </p>
            )}
            <form
              onSubmit={() => {
                handleSubmit();
              }}
            >
              <input
                type="text"
                value={search}
                placeholder="Rechercher un personnage"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>
            </form>
          </div>
          <div className="characters-grid">
            {data.results.map((element, index) => {
              // Thumbnail construction
              const thumbnail = `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`;
              // Initialysing starred management
              let newArray = [];
              newArray = [...starred];
              const find = newArray.find(({ id }) => id === element._id);

              return (
                <div key={element._id} className="character-tile">
                  <Link
                    to={`/character/${element._id}`}
                    className="characters-thumbnail"
                  >
                    <img src={thumbnail} alt={element.name} />
                  </Link>
                  <h2>{element.name}</h2>
                  {/* Starring a character */}
                  {!find ? (
                    <button
                      onClick={() => {
                        newArray.push({
                          type: "character",
                          id: element._id,
                          name: element.name,
                          description: element.description,
                          thumbnail: thumbnail,
                        });
                        SetStarred(newArray);
                        // Envoi du tableau dans un Cookie
                        const cookieArray = JSON.stringify(newArray);
                        Cookies.set("starred", cookieArray, {
                          expires: 30,
                          SameSite: "Lax",
                        });
                      }}
                    >
                      + mettre en favoris
                    </button>
                  ) : (
                    <p>Favori !</p>
                  )}
                  {/* {element.description && <p>{element.description}</p>} */}
                </div>
              );
            })}
          </div>

          <div className="navigation">
            {skip >= 1 && (
              <button
                onClick={() => {
                  setSkip((current) => current - 1);
                }}
              >
                Page précédente
              </button>
            )}
            {data.count > 100 && (
              <button
                onClick={() => {
                  setSkip((current) => current + 1);
                }}
              >
                Page suivante
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading in Progress...</p>
      )}
    </div>
  );
};

export default Characters;
