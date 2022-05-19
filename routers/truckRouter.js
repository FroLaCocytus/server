const Router = require('express')
const router = new Router()
const truckController = require('../controllers/truckController')
const checkRole = require('..//middleware/checkRoleMiddleware')

router.post('/', truckController.create)
router.get('/', truckController.getAll)
router.get('/:id', truckController.getOne)



module.exports = router