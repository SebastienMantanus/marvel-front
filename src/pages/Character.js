import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Character = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel--marvel--vqtmsgjlf7qx.code.run/comics/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  });

  return (
    <div className="characters-main">
      {!isLoading ? (
        <div className="character-main">
          <div className="character-header">
            <div>
              <h1>{data.name}</h1>
              {data.description && <p>{data.description}</p>}
            </div>
            <div>
              <img
                src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
                alt="toto"
              />
            </div>
          </div>
          <div className="character-details">
            <div>
              <h2>Comics</h2>
              {data.comics.map((element, index) => {
                return (
                  <div key={index} className="character-comics">
                    <img
                      src={`${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`}
                      alt={element.title}
                    ></img>
                    <div>
                      <h3>{element.title}</h3>

                      <p>{element.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default Character;
