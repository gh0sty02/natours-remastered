import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img
          src={`${process.env.REACT_APP_ASSESTS_URL}img/logo-green.png`}
          alt="Natours logo"
        />
      </div>
      <ul className="footer__nav">
        <li>
          <Link to="#">About us</Link>
        </li>
        <li>
          <Link to="#">Download apps</Link>
        </li>
        <li>
          <Link to="#">Become a guide</Link>
        </li>
        <li>
          <Link to="#">Careers</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy;Design by Jonas Schmedtmann. Recreated and Enhanced by Pranay
        Yadav. All rights reserved.
      </p>
    </div>
  );
};

export default footer;
