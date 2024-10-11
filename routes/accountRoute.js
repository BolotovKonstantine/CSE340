const express = require("express")
const router = new express.Router()
const accController = require("../controllers/accountController")
const utilities = require("../utilities/")

router.get('/login', utilities.handleErrors(accController.buildLogin))
router.get('/registration', utilities.handleErrors(accController.buildRegister))
router.post('/register', utilities.handleErrors(accController.registerAccount))

module.exports = router