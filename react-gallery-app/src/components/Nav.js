import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  const handleNavLinkClick = (tag) => {
    props.changeQuery(tag);
    //navigate(`search/${tag}`);
  };

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/dogs" onClick={() => handleNavLinkClick("dogs")}>
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/cats" onClick={() => handleNavLinkClick("cats")}>
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink to="/computers" onClick={() => handleNavLinkClick("computers")}>
            Computers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;