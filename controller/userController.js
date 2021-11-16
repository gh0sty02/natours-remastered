const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        error: "No Users Found",
      });
    }

    return res.status(200).json({
      message: "success",
      users,
    });
  } catch (err) {
    {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
exports.signup = async (req, res, next) => {
  try {
    const { name, email, role, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({
        message: "Password dont match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email === email) {
      return res.status(400).json({
        error:
          "user with this email already exists, Please Login or use another Email",
      });
    }

    let hashedPassword;

    hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      image: req.file.filename,
    });

    newUser.save();

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "Success",
      user: [newUser.name],
      token,
    });
  } catch (err) {
    {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        error: "User not found, Please Signup",
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(404).json({
        error: "credentials dont match,Please try again",
      });
    }

    const payload = {
      user: {
        id: existingUser.id,
        role: existingUser.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "login Successfull",
      user: existingUser.name,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "No user with that id found",
      });
    }

    user.remove();

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUserByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).json({
        error: "Please enter userId",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateUserByUserId = async (req, res, next) => {
  try {
    let body = {};
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!userId) {
      return res.status(400).json({
        error: "Please enter userId",
      });
    }
    if (req.file) {
      body = { ...req.body, image: req.file.filename };
    } else if (!req.file) {
      body = { ...req.body, image: user.image };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      message: "success",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        error: "Please enter userId",
      });
    }
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "No User with that id found",
      });
    }

    const checkPassword = await bcrypt.compare(currentPassword, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        error: "Invalid Password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);

    user.save();

    return res.status(200).json({
      message: "Password Changed Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
