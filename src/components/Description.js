import Cookies from "js-cookie";

const Description = ({ setVisible }) => {
  const description = Cookies.get("description");
  return (
    <div
      className="modal-root"
      onClick={() => {
        Cookies.remove("description");
        setVisible(null);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          Cookies.remove("description");
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            Cookies.remove("description");
            setVisible(null);
          }}
        >
          X
        </button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Description;
