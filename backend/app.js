const express = require("express");
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes')
const consoleRoutes = require("./src/routes/console.routes.js")
const partRoutes = require("./src/routes/part.routes.js")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/consoles", consoleRoutes)
app.use('/auth', authRoutes)
app.use("/parts", partRoutes)
app.use("/upload", express.static("upload")); 

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API RetroStock funcionando correctamente.",
  });
});



module.exports = app
