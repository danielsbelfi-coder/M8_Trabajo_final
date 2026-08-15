const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload");
  },
  filename: (req, file, cb) => {
    const nombreUnico =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      nombreUnico + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

module.exports = upload

