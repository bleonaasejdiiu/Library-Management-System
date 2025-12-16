const authService = require('../services/authService');

class AuthController {
    // --- REGISTER ---
    async register(req, res) {
        try {
            const userId = await authService.register(req.body);
            res.status(201).json({ success: true, message: 'U regjistrua me sukses!', userId });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // --- LOGIN (E RE) ---
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Thërrasim servisin
            const result = await authService.login(email, password);
            
            res.json({ 
                success: true, 
                message: 'Login me sukses!',
                token: result.token,
                user: result.user
            });
        } catch (error) {
            res.status(401).json({ success: false, error: error.message });
        }
    }
}

module.exports = new AuthController();