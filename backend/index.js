const express = require('express');
const cors = require('cors'); // <--- Deklarohet vetëm një herë këtu
require('dotenv').config();
const db = require('./src/config/db'); 

// Importimi i Rrugëve (Routes)
const authRoutes = require('./src/routes/authRoutes'); 
const bookRoutes = require('./src/routes/bookRoutes'); // <--- E SHTOVA KËTË (SHUMË E RËNDËSISHME)

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // <--- Përdoret vetëm një herë
app.use(express.json());

// Përdorimi i Rrugëve (API Endpoints)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // <--- PA KËTË NUK PUNON ADMIN PANELI

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to DB!');
});

// Ndezja e Serverit
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    const [rows] = await db.query('SELECT 1');
    console.log("✅ SUKSES: U lidh me databazën në XAMPP!");
  } catch (error) {
    console.error("❌ GABIM: Nuk u lidh dot me databazën.", error.message);
  }
});