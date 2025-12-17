const userRepository = require('../repositories/userRepository');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();
