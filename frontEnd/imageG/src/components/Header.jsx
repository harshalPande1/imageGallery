import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()

  const navigateHandler = (e,flag) => {
    e.preventDefault()
    if (flag === "login") {
      navigate('/login')
    } else {
      navigate('/register')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
  }
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      {JSON.parse(localStorage.getItem('token')) && <a className="navbar-brand" href="#">{JSON.parse(localStorage.getItem('token'))?.fullName}</a>}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          {JSON.parse(localStorage.getItem('token')) && <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" href="#" onClick={logout}>Logout</NavLink>
          </li>}
          {!JSON.parse(localStorage.getItem('token')) && <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" href="#" onClick={(e) => navigateHandler(e,'register')}>Register</NavLink>
          </li>
          }
          {!JSON.parse(localStorage.getItem('token')) && <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" href="#" onClick={(e) => navigateHandler(e,'login')}>LogIn</NavLink>
          </li>}

        </ul>
      </div>
    </div>
  </nav>
};

export default Header;
