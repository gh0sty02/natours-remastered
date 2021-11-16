import React, { Fragment, useEffect } from "react";

import TourItem from "../components/TourItem";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours } from "../../reducers/tourSlice";

const TourList = () => {
  const dispatch = useDispatch();
  const { tours, loading } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(getAllTours());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && !tours && (
        <h2 className="heading-secondary">
          Something Went Wrong, Please Reload
        </h2>
      )}
      <div className="card-container">
        {tours &&
          tours.length !== 0 &&
          tours.map((tour) => {
            return (
              <TourItem
                key={tour._id}
                _id={tour._id}
                imageCover={tour.imageCover}
                name={tour.name}
                summary={tour.summary}
                difficulty={tour.difficulty}
                duration={tour.duration}
                locations={tour.locations}
                startDate={tour.startDate}
                maxGroupSize={tour.maxGroupSize}
                price={tour.price}
                ratingsAvg={tour.ratingsAvg}
                startLocation={tour.startLocation}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default TourList;
