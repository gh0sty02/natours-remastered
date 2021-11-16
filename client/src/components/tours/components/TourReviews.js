import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewByTourId } from "../../reducers/reviewSlice";
import LoadingSpinner from "../../utils/LoadingSpinner";
import TourInfoReviewItem from "./TourReviewItem";

const TourInfoReview = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewByTourId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { reviews, loading } = useSelector((state) => state.review);
  return (
    <section className="section-reviews">
      {loading && !reviews && <LoadingSpinner />}
      {!loading && !reviews && (
        <h2 className="err-msg__center">No Reviews Found !</h2>
      )}
      {reviews && (
        <div className="reviews">
          {reviews &&
            reviews.map((review, i) => (
              <TourInfoReviewItem
                key={i}
                review={review.review}
                rating={review.rating}
                user={review.user}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default TourInfoReview;
