import axios from "axios";
import { useState, useEffect } from "react";

const Characters = () => {
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
  }, [skip, search]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="characters-main">
      {!isLoading ? (
        <div>
          <div className="title-search">
            <h1>Characters</h1>
            <p>
              Page : {skip} / {Math.ceil(data.count / 100)}{" "}
            </p>
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
              const thumbnail = `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`;

              return (
                <div key={element._id} className="characters-thumbnail">
                  <img src={thumbnail} alt={element.name} />
                  <h2>{element.name}</h2>
                  {element.description && <p>show description...</p>}
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
                précédent
              </button>
            )}
            {data.count > 100 && (
              <button
                onClick={() => {
                  setSkip((current) => current + 1);
                }}
              >
                Suivant
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
