const { Console, Part } = require("../models");

const getPartsByConsole = async (req, res) => {
  try {
    const { consoleId } = req.params;

    const foundConsole = await Console.findByPk(consoleId);

    if (!foundConsole) {
      const error = new Error("La consola indicada no existe.");
      error.status = 404;
      throw error;
    }

    const parts = await Part.findAll({ where: { consoleId } });

    return res.status(200).json({
      ok: true,
      data: parts,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
    });
  }
};

const createPart = async (req, res) => {
  try {
    const { nombre, condicion, consoleId, contacto } = req.body;

    if (!nombre || !condicion || !consoleId || !contacto) {
      const error = new Error("Nombre, condición y consoleId y contacto son obligatorios.");
      error.status = 400;
      throw error;
    }

    const consoleEncontrada = await Console.findByPk(consoleId);
    if (!consoleEncontrada) {
      const error = new Error("La consola indicada no existe.");
      error.status = 400;
      throw error;
    }

    const imagenUrl = req.file ? `/upload/${req.file.filename}` : null;

    const part = await Part.create({
      nombre,
      condicion,
      consoleId,
      imagenUrl,
      contacto,
    });

    return res.status(201).json({
      data: {
        message: "Repuesto creado correctamente.",
        part,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
    });
  }
};

const deletePart = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await Part.findByPk(id);

    if (!part) {
      const error = new Error("El repuesto indicado no existe.");
      error.status = 404;
      throw error;
    }

    await part.destroy();

    return res.status(200).json({
      ok: true,
      message: "Repuesto eliminado correctamente.",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getPartsByConsole,
  createPart,
  deletePart
};