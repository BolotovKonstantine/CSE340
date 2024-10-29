// controllers/reportsController.js

const reportsModel = require('../models/reports-model');
const utilities = require('../utilities');

exports.inventoryReport = async (req, res) => {
    let nav = await utilities.getNav();
    try {
        const items = await reportsModel.getInventory();
        res.render('reports/inventory-report', {
            title: "Reports",
            nav,
            errors: null,
            items });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving inventory data');
    }
};