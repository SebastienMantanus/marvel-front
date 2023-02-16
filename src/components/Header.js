import logo from "../assets/logo.png";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/">
        {" "}
        <img src={logo} alt="marvel visual" />
      </Link>
      <div>
        <Link to="/">Personnages</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favoris">Favoris</Link>
      </div>
    </header>
  );
};

export default Header;
