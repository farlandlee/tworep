import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-brown">
    <h2>
      <Link className="navbar-brand" to="/">
        Two Reporters
      </Link>
    </h2>
    <div className="collapse navbar-collapse main-nav" id="main-nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/search">
            Search
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/volumes">
            Volumes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
