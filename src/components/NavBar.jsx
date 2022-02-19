import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">HOME</Link> |{" "}
        <Link to="/imageDetails">Image Details (not working)</Link> |{" "}
        <Link to="/favorites">Favorites</Link>
      </nav>
    </div>
  );
};

export default NavBar;
