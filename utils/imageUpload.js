const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { v4 } = require("uuid");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("image");

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const fileName = `uploads/images/${v4()}.jpeg`;

    req.file.filename = fileName;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`${fileName}`);

    next();
  } catch (err) {
    console.log("man down");
    return res.status(500).json({
      error: err.message,
    });
  }
};
