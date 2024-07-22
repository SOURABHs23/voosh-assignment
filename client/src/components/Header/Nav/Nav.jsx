import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ handleLogout }) => {
  return (
    <nav>
      <h1>Reallo</h1>
      <NavLink
          to="/"
          className={"nav-link"}
        >
          My Boards
        </NavLink>
      <h3 id="logout-button" onClick={handleLogout}>Logout</h3>
    </nav>
  );
};

export default Nav;
