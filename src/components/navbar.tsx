import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/generate">Generate</Link>
      </li>
      <li>
        <Link to="/explore/recent">Explore</Link>
      </li>
      <li>
        <Link to="/fonts">Fonts</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-default navbar-foonts">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Foonts
          </Link>
        </div>
        {links}
      </div>
    </nav>
  );
};

export default Navbar;
