const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name !!"],
    },

    email: {
      type: String,
      required: [true, "please provide your email"],
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin"],
      default: "user",
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("User", userSchema);
