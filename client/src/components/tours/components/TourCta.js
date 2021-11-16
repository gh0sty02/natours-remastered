import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TourInfoCta = ({ images, duration }) => {
  let { token } = useSelector((state) => state.auth);

  if (!token) {
    token = localStorage.getItem("token");
  }

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img
            src={`${process.env.REACT_APP_ASSESTS_URL}img/logo-white.png`}
            alt="Natours logo"
            className=""
          />
        </div>
        <img
          src={`${process.env.REACT_APP_ASSESTS_URL}${images[2]}`}
          alt=""
          className="cta__img cta__img--1"
        />
        <img
          src={`${process.env.REACT_APP_ASSESTS_URL}${images[1]}`}
          alt=""
          className="cta__img cta__img--2"
        />

        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {`${duration} days. 1 adventure. Infinite memories. Make it yours today!`}
          </p>
          <Link
            to={token ? "/bookTour" : "/login"}
            className="btn btn--green span-all-rows"
          >
            {token ? " Book tour now!" : "Login To Book Tour"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TourInfoCta;
