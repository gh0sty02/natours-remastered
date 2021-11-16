import React from "react";

import { AiOutlineClockCircle } from "react-icons/ai";
import { BsMap } from "react-icons/bs";

const TourInfoHeader = ({ imageCover, name, duration, location }) => {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img
          className="header__hero-img"
          src={`${process.env.REACT_APP_ASSESTS_URL}${imageCover}`}
          alt="Tour 5"
        />
      </div>

      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{name}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <AiOutlineClockCircle className="heading-box__icon" />
            <span className="heading-box__text">{`${duration} days`}</span>
          </div>
          <div className="heading-box__detail">
            <BsMap className="heading-box__icon" />
            <span className="heading-box__text">{location.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourInfoHeader;
