const express = require("express");
const router = express.Router();

const reviewController = require("../controller/reviewController");
const { auth } = require("../controller/authController");

router.get("/:tourId", reviewController.getReviewByTourId);
router.post("/:tourId", auth, reviewController.createReview);

router.get("/", reviewController.getAllReviews);

router
  .get("/:userId/:reviewId", auth, reviewController.getReviewByReviewId)
  .patch("/:userId/:reviewId", auth, reviewController.updateReviewById);

module.exports = router;
