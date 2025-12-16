const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

class AuthService {
    async registerMember(data) {
        // 1. Kontrollo a ekziston email-i
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Ky email është i regjistruar tashmë!');
        }

        // 2. Hasho fjalëkalimin (që të mos ruhet tekst i thjeshtë)
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3. Përgatit të dhënat për Repository
        const newMemberData = {
            ...data,
            password: hashedPassword
        };

        // 4. Ruaje në database
        return await userRepository.createMember(newMemberData);
    }
}

module.exports = new AuthService();