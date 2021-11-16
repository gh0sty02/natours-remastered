const Tour = require("../models/toursModel");
const User = require("../models/userModel");

exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.find();
    if (tours.length === 0) {
      return res.status(404).json({
        error: " no tours founds, try creating one !",
      });
    }

    return res.status(200).json({
      message: "success",
      tours,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const {
      name,
      duration,
      maxGroupSize,
      difficulty,
      ratingsAvg,
      ratingsQuantity,
      price,
      summary,
      description,
      imageCover,
      startLocation,
      locations,
      guides,
      images,
      startDate,
    } = req.body;
    const tour = await new Tour({
      name,
      duration,
      maxGroupSize,
      difficulty,
      ratingsAvg,
      ratingsQuantity,
      price,
      summary,
      description,
      imageCover,
      startLocation,
      locations,
      guides,
      images,
      startDate,
    });

    await tour.save();

    return res.status(201).json({
      message: "Tour Created successfully",
      tour,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        error: "No Tour with that id found ",
      });
    }

    return res.status(200).json({
      message: "success",
      tour,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(400).json({
        error: "Please Enter a Valid Id",
      });
    } else {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({
        error: "Cannot find the tour to update by that id",
      });
    }

    return res.status(200).json({
      message: "Tour Updated Successfully",
      tour,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(400).json({
        error: "Please Enter a Valid Id",
      });
    } else {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Tour.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Tour Deleted Successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(400).json({
        error: "Please Enter a Valid Id",
      });
    } else {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
