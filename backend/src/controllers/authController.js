const authService = require('../services/authService');

class AuthController {
    async register(req, res) {
        try {
            // req.body janë të dhënat që vijnë nga React (emri, email, pass...)
            const result = await authService.registerMember(req.body);
            res.status(201).json({ message: 'Përdoruesi u regjistrua me sukses!', userId: result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();