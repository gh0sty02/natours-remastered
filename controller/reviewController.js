const User = require("../models/userModel");
const Tour = require("../models/toursModel");
const Review = require("../models/reviewModel");

exports.createReview = async (req, res, next) => {
  try {
    const tourId = req.params.tourId;

    if (!tourId) {
      return res.status(400).json({
        error: "please enter a tour id",
      });
    }

    const tour = await Tour.findById(tourId).select("id name");
    const user = await User.findById(req.user.id).select(
      "-password -passwordConfirm"
    );

    console.log(tour, user);

    const { review, rating, createdAt } = req.body;

    const newReview = await new Review({
      review,
      rating,
      createdAt,
      tour,
      user,
    });

    await newReview.save();

    return res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({
        error: "Invalid Id",
      });
    }
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate({ path: "user", select: "image name" })
      .populate({ path: "tour", select: "name" });
    // .populate({
    //   path: "tour",
    //   select: "-locations -description -guides -images",
    // });
    if (reviews.length === 0) {
      return res.staus(404).json({
        error: "No reviews on this tour found !!",
      });
    }

    // console.log(reviews);
    return res.status(200).json({
      reviews: reviews,
    });
  } catch (err) {
    res.status(404).json({
      error: "No Reviews Found",
    });
  }
};

exports.getReviewByReviewId = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId)
      .populate({ path: "user", select: "-password -passwordChange" })
      .populate({
        path: "tour",
        select: "-locations -description -guides -images",
      });

    if (!review) {
      return res.status(404).json({
        error: "review not found",
      });
    }

    return res.status(200).json({
      message: "success",
      review,
    });
  } catch (err) {
    res.status(404).json({
      error: "No Review Found",
    });
  }
};

exports.updateReviewById = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    await review.save();

    if (!review) {
      return res.status(404).json({
        error: "review not found",
      });
    }

    return res.status(200).json({
      message: "success",
      review,
    });
  } catch (err) {
    res.status(404).json({
      error: "No Reviews Found",
    });
  }
};

exports.getReviewByTourId = async (req, res, next) => {
  try {
    const tourId = req.params.tourId;

    const reviews = await Review.find({ tour: tourId })
      .populate({ path: "user", select: "-password -passwordConfirm" })
      .populate({
        path: "tour",
        select: "-startLocation -locations -description -guides -images",
      });

    if (reviews.length === 0) {
      return res.status(404).json({
        error: "No reviews found",
      });
    }

    return res.status(200).json({
      message: "success",
      reviews,
    });
  } catch (err) {
    res.status(404).json({
      error: "No Review Found",
    });
  }
};
