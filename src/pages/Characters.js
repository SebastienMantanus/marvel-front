import axios from "axios";
import { useState, useEffect } from "react";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel--marvel--vqtmsgjlf7qx.code.run/characters"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

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
                  <p>{element.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading in Progress...</p>
      )}
    </div>
  );
};

export default Characters;
