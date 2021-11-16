import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import TourHeader from "../components/TourHeader";
import TourDescription from "../components/TourDescription";
import TourReviews from "../components/TourReviews";
import TourMap from "../components/TourMap";
import TourCta from "../components/TourCta";
import { getTourById } from "../../reducers/tourSlice";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";

const Tour = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const tourId = params.tourId;

  useEffect(() => {
    dispatch(getTourById(tourId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { tour } = useSelector((state) => state.tour);

  return (
    <Fragment>
      {!tour && <LoadingSpinner />}
      {tour && (
        <TourHeader
          imageCover={tour.imageCover}
          name={tour.name}
          duration={tour.duration}
          location={tour.startLocation}
        />
      )}
      {tour && (
        <TourDescription
          date={tour.startDate && tour.startDate}
          difficulty={tour.difficulty}
          maxGroupSize={tour.maxGroupSize}
          ratingsAvg={tour.ratingsAvg}
          guides={tour.guides}
          description={tour.description}
          images={tour.images}
          name={tour.name}
        />
      )}
      {tour && tour.locations && (
        <TourMap
          locations={tour.locations}
          startLocation={tour.startLocation}
        />
      )}
      {tour && <TourReviews id={tour._id} />}
      {tour && <TourCta images={tour.images} duration={tour.duration} />}
    </Fragment>
  );
};
export default Tour;
