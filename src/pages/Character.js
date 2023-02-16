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
          `https://marvel--marvel--vqtmsgjlf7qx.code.run/character/${id}`
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
        <div className="charater-title">
          <h1>{data.name}</h1>
          {data.description && <p>{data.description}</p>}
          <div className="character-details">
            <img
              src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
              alt="toto"
            />
            <div>
              <h2>Comics</h2>
              {/* 
              {data.comics.map( (element, index) => {
                return <p>toto</p>;
              })} */}
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
