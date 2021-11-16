import React from "react";
import { AiOutlineStar } from "react-icons/ai";

const TourInfoReviewList = ({ review, user, rating }) => {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`${process.env.REACT_APP_ASSESTS_URL}${user.image}`}
          alt={`${user.name}`}
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{user.name}</h6>
      </div>
      <p className="reviews__text">{review}</p>

      <div className="reviews__rating">
        {[1, 2, 3, 4, 5].map((n, i) => (
          <AiOutlineStar
            key={i}
            className={`{${
              n <= rating
                ? `reviews__star reviews__star--active`
                : "reviews__star reviews__star--inactive"
            }`}
            style={{ height: "2rem", width: "2rem", marginRight: "1px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default TourInfoReviewList;
