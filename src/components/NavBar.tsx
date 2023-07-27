import React, { FunctionComponent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavBarProps {
  userInfo: any;
  setUserInfo: Function;
  darkMode: boolean;
  toggleDarkMode: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({ userInfo, setUserInfo, darkMode, toggleDarkMode }) => {
 
  const navigate = useNavigate();


  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    setUserInfo({ email: false, role: false });
    navigate("/Login");
  };
  
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/Home">
          BCARD
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/About">
                ABOUT
              </NavLink>
            </li>
            {(userInfo.role === "business" || userInfo.role === "regular" || userInfo.role === "admin") && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/Fav">
                  FAV CARDS
                </NavLink>
              </li>
            )}
            {(userInfo.role === "business" || userInfo.role === "admin") && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/MyCard">
                    MY CARDS
                  </NavLink>
                </li>
              </>
            )}
            {userInfo.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/SenBox">
                  SANDBOX
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </div>
            </li>
          </ul>
          
            
                {<div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="darkModeSwitch"
                    checked={darkMode}
                    onChange={() => toggleDarkMode()}
                  />
                  <label className="form-check-label" htmlFor="darkModeSwitch">
                    {darkMode ? "" : ""}
                  </label>
                </div>
             }
          
          <ul className="navbar-nav ml-auto">
            {!userInfo.email && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Register">
                    SIGNUP
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    LOGIN
                  </NavLink>
                </li>
              </>
            )}
            {userInfo.email && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
            )}
           
            {userInfo.email && (
              <li className="nav-item">
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
