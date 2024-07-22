import React from "react";
import Nav from "./Nav";

const Header = ({handleLogout}) => {
  return (
    <header>
      <Nav handleLogout={handleLogout}/>
    </header>
  );
};

export default Header;
