//DB.JS

const {Pool} = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production" || !!process.env.DATABASE_URL;


const devConfig  = {
    user: process.env.PGUSER || "postgres",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "student_digs_finder",
    password: process.env.PGPASSWORD || "my_password",
    port: process.env.PGPORT || 5432,
}


const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    // Required for Heroku/Render/Railway's PostgreSQL (SSL)
    ssl: {
        rejectUnauthorized: false,
    },
};

const pool = new Pool(isProduction ? prodConfig : devConfig);

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = {
    query: (text, params) => pool.query(text, params),
}