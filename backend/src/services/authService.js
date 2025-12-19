const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    
    // --- REGISTER ---
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Ky email është tashmë i regjistruar!');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newMemberData = { ...data, password: hashedPassword };
        
        return await userRepository.create(newMemberData);
    }

    // --- LOGIN ---
    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email ose Password i gabuar!');
        }

        const isMatchHash = await bcrypt.compare(password, user.password);
        
        if (!isMatchHash && password !== user.password) {
             throw new Error('Email ose Password i gabuar!');
        }

        const role = await userRepository.getRole(user.email);

        // Këtu përcaktojmë ID-në e saktë nga databaza
        // Përdorim personId sepse kështu e ka databaza jote, por shtojmë fallback
        const finalUserId = user.personId || user.userId || user.memberId || user.id;

        const token = jwt.sign(
            { 
                id: finalUserId, 
                email: user.email, 
                role: role || 'member' 
            }, 
            process.env.JWT_SECRET || 'sekret_i_perkohshem', 
            { expiresIn: '2h' } 
        );

        return {
    token,
    user: {
        userId: user.memberId || user.personId, // Prioriteti te memberId
        memberId: user.memberId,               // Kjo është ID-ja që duhet për Borrow!
        personId: user.personId,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: role || 'User'
    }
};
    }
}

module.exports = new AuthService();