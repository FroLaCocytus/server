const Router = require('express')
const router = new Router()
const truckController = require('../controllers/truckController')

router.post('/', truckController.create)
router.get('/', truckController.getAll)
router.get('/:id', truckController.getOne)
router.get('/one/id', truckController.getOneId)
router.post('/one', truckController.updateKey)

module.exports = router