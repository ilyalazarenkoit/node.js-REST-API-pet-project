const path = require("path");
const multer = require("multer");
const tempDir = path.join(process.cwd(), "tmp");
const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {
  multerConfig,
};
