const { Console } = require("../models")

const getConsoles = async (req, res) => {
    try {
        const console = await Console.findAll();

        return res.status(200).json({
            ok: true,
            data: console,
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
};

const createConsole = async (req, res) => {
    try {
        const { fabricante, modelo, generacion } = req.body;

        if (!fabricante || !modelo || !generacion) {
            throw new Error("Datos de la consola son obligatorios")
        }

        const newConsole = await Console.create({
            fabricante,
            modelo,
            generacion
        })

        return res.status(201).json({
            ok: true,
            data: newConsole,
        })
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

module.exports = {
    createConsole,
    getConsoles
}