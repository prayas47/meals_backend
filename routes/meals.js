const express = require('express')
const router = express.Router()
let middleware = require('../common/middleware/moddleware')
let Middleware = new middleware()

let mainController = require('../controller/mealsController')
let MainController = new mainController()

router.post('/addMeals' , Middleware.checkAuthorization, MainController.addMeals)

router.get('/fetchMealsList' , Middleware.checkAuthorization, MainController.fetchMealsList)

router.put('/updateMeals/:id' , Middleware.checkAuthorization, MainController.updateMeals)

router.delete('/deleteMeals/:id' , Middleware.checkAuthorization, MainController.deleteMeals)

module.exports = router