const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    // --- REGJISTRIMI (E ke pasur) ---
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Ky email është tashmë i regjistruar!');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newMemberData = { ...data, password: hashedPassword };
        return await userRepository.createMember(newMemberData);
    }

    // --- LOGIN (E RE) ---
    async login(email, password) {
        // 1. Gjej userin
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email ose Password i gabuar!');
        }

        // 2. Krahaso passwordin (tekst) me hash-in në DB
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Email ose Password i gabuar!');
        }

        // 3. Krijo Token (Leja e hyrjes)
        const token = jwt.sign(
            { id: user.personId, role: 'member' }, // Të dhënat që ruhen në token
            process.env.JWT_SECRET || 'sekret_i_perkohshem', // Çelësi sekret
            { expiresIn: '1h' } // Skadon pas 1 ore
        );

        // Kthejmë userin (pa password) dhe tokenin
        return {
            token,
            user: {
                id: user.personId,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            }
        };
    }
}

module.exports = new AuthService();