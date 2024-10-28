// controllers/reportsController.js

const reportsModel = require('../models/reports-model');
const utilities = require('../utilities');

exports.inventoryReport = async (req, res) => {
    const category = req.query.category;

    if (!category) {
        return res.status(400).send('Category is required');
    }

    try {
        const items = await reportsModel.getInventoryByCategory(category);
        const categories = utilities.buildClassificationList(); // Assuming this returns categories
        res.render('reports/inventory-report', { items, category, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving inventory data');
    }
};