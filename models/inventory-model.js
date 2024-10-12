const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function addClassification(classification_name) {
    // ..for insertion to the database.
    try{
    const sql = `INSERT INTO classification (classification_name) 
    VALUES ($1)`;
    return await pool.query(sql, [classification_name])
} catch (error) {
        return error.message
    }}
/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}

async function getInventoryById(inv_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory 
      WHERE inv_id  = $1`,
            [inv_id]
        )
        return data.rows[0]
    } catch (error) {
        console.error("getInventoryById error " + error)
    }
}
module.exports = {getClassifications, getInventoryByClassificationId, getInventoryById, addClassification}