const express = require("express");
const router = express.Router();

const tourController = require("../controller/tourController");
const { auth, restrictTo } = require("../controller/authController");
// router
//   .get("/", tourController.getAllTours)
//   .post("/", tourController.createTour)
//   .get("/:id", tourController.getTourById);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(auth, restrictTo("admin"), tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(
    auth,
    restrictTo("admin", "lead-guide", "guide"),
    tourController.updateTour
  )
  .delete(auth, restrictTo("admin"), tourController.deleteTour);

module.exports = router;
