const Starred = ({ SetStarred, starred }) => {
  console.log(starred);
  const test = starred.indexOf("5fcf91f8d8a2480017b9145a");
  console.log("TEST ====>" + test);
  return (
    <div>
      <p>Starred</p>
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
