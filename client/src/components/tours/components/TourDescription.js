import React, { Fragment, useState, useEffect } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineUser, AiOutlineStar } from "react-icons/ai";
import { FaCalendar } from "react-icons/fa";

const TourInfoDescription = ({
  date,
  difficulty,
  maxGroupSize,
  ratingsAvg,
  guides,
  description,
  images,
  name,
}) => {
  const [tourDate, setTourDate] = useState("");
  useEffect(() => {
    if (date.length !== 0) {
      const newDate = new Date(date[0]);

      const month = newDate.getMonth() + 1;

      const dateNum = newDate.getDate();
      const year = newDate.getFullYear();

      setTourDate(`${dateNum}/${month}/${year}`);
    }
  }, [date]);
  return (
    <Fragment>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div className="overview-box__detail">
                <FaCalendar className="overview-box__icon" />
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">{`${tourDate}`}</span>
              </div>
              <div className="overview-box__detail">
                <HiTrendingUp className="overview-box__icon" />
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{difficulty}</span>
              </div>
              <div className="overview-box__detail">
                <AiOutlineUser className="overview-box__icon" />
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{`${maxGroupSize} People`}</span>
              </div>
              <div className="overview-box__detail">
                <AiOutlineStar className="overview-box__icon" />
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">{`${ratingsAvg} / 5`}</span>
              </div>
            </div>

            {/* <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              <div className="overview-box__detail">
                <img
                  src="img/users/user-19.jpg"
                  alt="Lead guide"
                  className="overview-box__img"
                />
                <span className="overview-box__label">Lead guide</span>
                <span className="overview-box__text">Steven Miller</span>
              </div>
              <div className="overview-box__detail">
                <img
                  src="img/users/user-18.jpg"
                  alt="Tour guide"
                  className="overview-box__img"
                />
                <span className="overview-box__label">Tour guide</span>
                <span className="overview-box__text">Lisa Brown</span>
              </div>
              <div className="overview-box__detail">
                <img
                  src="img/users/user-17.jpg"
                  alt="Intern"
                  className="overview-box__img"
                />
                <span className="overview-box__label">Intern</span>
                <span className="overview-box__text">Max Smith</span>
              </div>
            </div> */}
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About the park camper tour
          </h2>
          {description.split(".").map((p, i) => (
            <p key={i} className="description__text">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section-pictures">
        {images &&
          images.map((image, i) => (
            <div className="picture-box" key={i}>
              <img
                className={`picture-box__img picture-box__img--${i + 1}`}
                src={`${image}`}
                alt={`${name} Tour`}
              />
            </div>
          ))}
      </section>
    </Fragment>
  );
};

export default TourInfoDescription;
