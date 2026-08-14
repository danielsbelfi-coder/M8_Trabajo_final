const express = require("express");
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes')


const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads' , express.static('src/upload'))
app.use('/api/auth', authRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API RetroStock funcionando correctamente.",
  });
});

module.exports = app
