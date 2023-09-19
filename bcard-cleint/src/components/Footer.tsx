import React, { FunctionComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import About from "./About";

interface FooterProps {
  userInfo: any;
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo }) => {
  return (
    <div className="footer">
      <div className="icon-container">
         {(userInfo.role === "business" || userInfo.role === "admin") && (
            <Link to="/MyCard" className="about-link mx-3">
          <i className="fa-solid fa-address-card"></i>
          <br />
         My Card
        </Link >
         )}
        <Link to="/about" className="about-link">
          <i className="fa-solid fa-exclamation-circle"></i>
          <br />
          ABOUT
        </Link >
        {(userInfo.role === "business" || userInfo.role === "regular" || userInfo.role === "admin") && (
          <Link to="/Fav" className="about-link mx-3">
            <i className="fa-solid fa-heart"></i>
            <br />
            FAV
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;

