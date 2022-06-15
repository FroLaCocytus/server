const Router = require('express')
const router = new Router()
const humidityController = require('../controllers/humidityController')

router.get('/', humidityController.getAll)

module.exports = router