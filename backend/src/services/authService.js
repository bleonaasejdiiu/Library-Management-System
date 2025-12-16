const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    // --- REGJISTRIMI (I pandryshuar) ---
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Ky email është tashmë i regjistruar!');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newMemberData = { ...data, password: hashedPassword };
        return await userRepository.createMember(newMemberData);
    }

    // --- LOGIN (Me logjikën e Roleve e shtuar) ---
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

        // --- PJESA E RE: Përcaktojmë rolin ---
        // Supozojmë se kolona ID në tabelën Person quhet 'personId'.
        // Nëse në databazë kolona Primary Key e Person quhet vetëm 'id', ndrysho 'user.personId' në 'user.id'
        const role = await userRepository.getRole(user.personId);

        // 3. Krijo Token (Leja e hyrjes)
        // Tani roli nuk është fiks 'member', por vjen nga databaza ('admin' ose 'member')
        const token = jwt.sign(
            { id: user.personId, role: role }, 
            process.env.JWT_SECRET || 'sekret_i_perkohshem', 
            { expiresIn: '1h' } 
        );

        // Kthejmë userin, tokenin DHE rolin për Frontend-in
        return {
            token,
            user: {
                id: user.personId,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: role // E rëndësishme që Frontend-i të dijë ku të bëjë redirect
            }
        };
    }
}

module.exports = new AuthService();