const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { uploadUserPhoto, resizeUserPhoto } = require("../utils/imageUpload");
const userController = require("../controller/userController");
const { auth } = require("../controller/authController");

router.route("/").get(userController.getAllUsers);

router.post("/signup", uploadUserPhoto, resizeUserPhoto, userController.signup);

router.post(
  "/login",
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body(
      "password",
      "The password length should be equal to greater than 8 characters"
    ).isLength({ min: 8 }),
  ],
  userController.login
);
// get user by userId
router.get("/:userId", userController.getUserByUserId);
// change the password using userId
router.post("/:userId", auth, userController.changePassword);
// update the user details by userId
router.patch(
  "/:userId",
  auth,
  uploadUserPhoto,
  resizeUserPhoto,
  userController.updateUserByUserId
);

router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
