const mongoose = require("mongoose");
const User = require("../models/userModel");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A Tour name must be less than or equal to 40 words"],
      minlength: [10, "A tour must be greater than or equal to 10 words"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either : easy, medium, difficult",
      },
    },
    ratingsAvg: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have a price"],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have a cover image"],
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: "Point",
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDate: [Date],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// tourSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: "-password -passwordConfirm --_v",
//   });
//   next();
// });

module.exports = mongoose.model("Tour", tourSchema);
