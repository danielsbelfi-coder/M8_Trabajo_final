const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const generateToken = require("../util/generateToken");
const register = async (req, res) => {
  try {
    const { alias, email, password } = req.body;

    if (!alias || !email || !password) {
      return res.status(400).json({
        error: "Alias, email y password son obligatorios.",
      });
    }

    const user = await User.create({
      alias,
      email,
      password,
    });

    return res.status(201).json({
      message: "Restaurador registrado correctamente.",
      user: {
        id: user.id,
        alias: user.alias,
        email: user.email,
      },
    });

  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "El alias o email ya se encuentra registrado.",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Los datos proporcionados no son válidos.",
      });
    }
    console.error("Error en el registro:", error);

return res.status(500).json({
      error: "Error interno del servidor.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son obligatorios.",
      });
    }

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        error: "Credenciales inválidas.",
      });
    }

    const passwordValida = await bcrypt.compare(

      password,
      user.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        error: "Credenciales inválidas.",
      });
    }

const token = generateToken;

    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
    });

  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({
      error: "Error interno del servidor.",
    });
  }
};

module.exports = {
  register,
  login,
};