import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">{JSON.parse(localStorage.getItem('token'))?.fullName}</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" href="#">Logout</NavLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
};

export default Header;