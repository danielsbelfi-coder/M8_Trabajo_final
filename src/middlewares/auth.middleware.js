const jwt = require("jsonwebtoken")

const SECRET_KEY = "esta-es-una-contraseña-super-segura"

const tokenVerifier = (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            throw new Error('Token no proporcionado')
        };

        const token = auth.split(" ")[1]

        if (!token) {
            throw new Error('Token no proporcionado')
        }

        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

        next()
    } catch (error) {
        res.status(403).json({
            error: "Acceso denegado. Token no proporcionado o inválido."
        })
    }
}
