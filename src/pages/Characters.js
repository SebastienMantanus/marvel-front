import axios from "axios";
import { useState, useEffect } from "react";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pageSkip = "";
        if (skip > 0) {
          pageSkip = "?skip=" + skip;
        }
        console.log("PAGESKIP =>" + pageSkip);
        const response = await axios.get(
          `https://marvel--marvel--vqtmsgjlf7qx.code.run/characters${pageSkip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [skip]);

  return (
    <div className="characters-main">
      {!isLoading ? (
        <div>
          <h1>Characters</h1>
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
          <div>
            {skip >= 1 && (
              <button
                onClick={() => {
                  setSkip((current) => current - 1);
                }}
              >
                précédent
              </button>
            )}
            <button
              onClick={() => {
                setSkip((current) => current + 1);
              }}
            >
              Suivant
            </button>

            <p>Page : {skip}</p>
          </div>
        </div>
      ) : (
        <p>Loading in Progress...</p>
      )}
    </div>
  );
};

export default Characters;
