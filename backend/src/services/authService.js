const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    
    // --- REGJISTRIMI ---
    async register(data) {
        // 1. Kontrollojmë emailin
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Ky email është tashmë i regjistruar!');
        }

        // 2. Hashojmë passwordin
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        // Krijojmë objektin e ri
        const newMemberData = { ...data, password: hashedPassword };
        
        // 3. Ruajmë në DB (Kujdes: funksioni quhet 'create' në Repository-n tonë)
        return await userRepository.create(newMemberData);
    }

    // --- LOGIN ---
    async login(email, password) {
        // 1. Gjej userin
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email ose Password i gabuar!');
        }

        // 2. Kontrollo Passwordin
        // Kjo pjesë trajton edhe Adminin manual (pa hash) edhe userat e rinj (me hash)
        const isMatchHash = await bcrypt.compare(password, user.password);
        
        // Nëse passwordi nuk përputhet me hash, kontrollojmë mos është tekst i thjeshtë (për Adminin manual)
        if (!isMatchHash && password !== user.password) {
             throw new Error('Email ose Password i gabuar!');
        }

        // 3. Merr Rolin (Admin/Staff/Member)
        // E RËNDËSISHME: Repository ynë pret 'email', jo ID
        const role = await userRepository.getRole(user.email);

        // 4. Krijo Token
        const token = jwt.sign(
            { 
                id: user.personId, 
                email: user.email, 
                role: role || 'member' 
            }, 
            process.env.JWT_SECRET || 'sekret_i_perkohshem', 
            { expiresIn: '2h' } 
        );

        // 5. Kthe të dhënat
        return {
            token,
            user: {
                id: user.personId,
                name: user.name,
                lastname: user.surname || user.lastname, // Përshtatet me çfarë ke në DB
                email: user.email,
                role: role || 'member' // <--- Këtu është çelësi për Frontendin
            }
        };
    }
}

module.exports = new AuthService();