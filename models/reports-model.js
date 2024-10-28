const pool = require("../database/")

async function getInventoryByCategory(category) {
    try {
        const query = 'SELECT name, quantity, price FROM inventory WHERE category = $1';
        const values = [category];
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (err) {
        throw new Error(`Database query failed: ${err.message}`);
    }
}

module.exports = { getInventoryByCategory };