const mysql = require('mysql2');
require('dotenv').config();

// Krijojmë lidhjen
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'universal_library',
});

// KJO ËSHTË PJESA KRYESORE: Duhet të eksportojmë pool.promise()
module.exports = pool.promise();