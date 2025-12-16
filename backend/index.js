const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/db'); // 1. Importojmë lidhjen me DB
const authRoutes = require('./src/routes/authRoutes'); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // 
app.get('/', (req, res) => {
  res.send('Backend is running and connected to DB!');
});

// 2. Ndezim serverin DHE testojmë lidhjen me XAMPP
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    // Bëjmë një pyetje të thjeshtë në databazë sa për provë
    const [rows] = await db.query('SELECT 1');
    console.log("✅ SUKSES: U lidh me databazën 'universal_library' në XAMPP!");
  } catch (error) {
    console.error("❌ GABIM: Nuk u lidh dot me databazën. Sigurohu që XAMPP është ndezur!", error.message);
  }
});