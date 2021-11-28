const express = require('express')
const router = express.Router()
let authController = require('../controller/authController')

let AuthController = new authController()

router.post('/signup' , AuthController.signUp)

router.post('/login' , AuthController.login)

module.exports = router