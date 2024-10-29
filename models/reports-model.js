const pool = require("../database/")

async function getInventory() {
    try {
        const query = 'SELECT inv_make, inv_model, inv_price FROM public.inventory ';
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        throw new Error(`Database query failed: ${err.message}`);
    }
}

module.exports = { getInventory};