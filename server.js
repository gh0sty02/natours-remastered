const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/tourRouter");
const reviewRouter = require("./routes/reviewRouter");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(cors());

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/img", express.static(path.join("img")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/reviews", reviewRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("server running successfully".underline.yellow)
    );
  })
  .catch((err) => console.log(`${err.message}.`.underline.red));
