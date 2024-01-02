const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    database: "postgres",
    password: process.env.DB_PASSWORD,
    port: 5432
})

module.exports = pool;