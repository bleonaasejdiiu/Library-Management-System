// Ndrysho 'u' në 'U' te emri i file-it
const userRepository = require('../repositories/UserRepository'); 

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();