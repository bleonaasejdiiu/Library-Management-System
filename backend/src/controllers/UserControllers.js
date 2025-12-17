const userService = require('../services/UserService');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("GET Users Error:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            res.json({ message: 'Përdoruesi u fshi me sukses' });
        } catch (error) {
            console.error("DELETE User Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
