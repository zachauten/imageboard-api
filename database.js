const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/imageboard';
const pool = new Pool({
    connectionString: connectionString
});
module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end()
}