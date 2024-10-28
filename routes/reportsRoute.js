// routes/reportsRoute.js

const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/inventory-report', reportsController.inventoryReport);

module.exports = router;