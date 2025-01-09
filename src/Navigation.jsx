import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
};

export default Navigation;
