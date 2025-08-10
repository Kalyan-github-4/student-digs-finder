const {Pool} = require("pg");
require("dotenv").config();


const pool = new Pool({
    user: process.env.PGUSER || "postgres",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "student_digs_finder",
    password: process.env.PGPASSWORD || "my_password",
    port: process.env.PGPORT || 5432,
})

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;