import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Comics = ({ SetStarred, starred }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pageSkip = "";
        let comicsSearch = "";

        if (skip > 0) {
          pageSkip = skip;
        }
        if (search) {
          comicsSearch = search;
          setSkip(0);
        }

        const response = await axios.get(
          `https://marvel--marvel--vqtmsgjlf7qx.code.run/comics?skip=${pageSkip}&title=${comicsSearch}`
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
            <h1>Comics</h1>
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
                placeholder="Rechercher un comics"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>
            </form>
          </div>
          <div className="characters-grid">
            {data.results.map((element, index) => {
              const thumbnail = `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`;
              let newArray = [];
              newArray = [...starred];
              const find = newArray.find(({ id }) => id === element._id);

              return (
                <div key={element._id} className="characters-thumbnail">
                  <img src={thumbnail} alt={element.title} />
                  <h2>{element.title}</h2>
                  {!find ? (
                    <button
                      onClick={() => {
                        newArray.push({
                          type: "comic",
                          id: element._id,
                          name: element.title,
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
                  {/* <p>{element.description}</p> */}
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

export default Comics;
