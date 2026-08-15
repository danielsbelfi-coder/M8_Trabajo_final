const express = require('express');
const router = express.Router()
const { getConsoles, createConsole } = require('../controllers/console.controllers');
const { getPartsByConsole } = require('../controllers/part.controllers');
const verifyToken = require("../middlewares/auth.middleware")

router.get("/", getConsoles)
router.post('/', createConsole)
router.get("/:consoleId/parts", getPartsByConsole)

module.exports = router