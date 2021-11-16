import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMap, BiCalendarAlt, BiFlag } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const TourItem = ({
  imageCover,
  name,
  summary,
  difficulty,
  duration,
  locations,
  startDate,
  maxGroupSize,
  price,
  ratingsAvg,
  startLocation,
  _id,
}) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    if (startDate.length !== 0) {
      const date = new Date(startDate[0]);
      const month = date.getMonth() + 1;

      const dateNum = date.getDate();
      const year = date.getFullYear();

      setDate(`${dateNum}/${month}/${year}`);
    }
  }, [startDate]);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`${process.env.REACT_APP_ASSESTS_URL}${imageCover}`}
            alt="Tour 1"
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{`${difficulty} ${duration}-day tour`}</h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <BiMap className="card__icon" />
          <span>{startLocation.description}</span>
        </div>
        <div className="card__data">
          <BiCalendarAlt className="card__icon" />
          <span>{date}</span>
        </div>
        <div className="card__data">
          <BiFlag className="card__icon" />
          <span>{`${locations.length} Days`}</span>
        </div>
        <div className="card__data">
          <AiOutlineUser className="card__icon" />
          <span>{`${maxGroupSize} People`}</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">{`$${price}`}</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAvg}</span>
          <span className="card__footer-text">rating (21)</span>
        </p>
        <Link to={`/tours/${_id}`} className="btn btn--green btn--small">
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourItem;
