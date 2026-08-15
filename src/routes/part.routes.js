const express = require("express");
const router = express.Router();
const { createPart } = require("../controllers/part.controllers");
const verifyToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware.js");

router.post("/", verifyToken, upload.single("imagen"), createPart);

module.exports = router;