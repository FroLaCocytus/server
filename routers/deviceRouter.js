const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.post('/controller', deviceController.createAll)
router.get('/one', deviceController.getOne)
router.get('/one/id', deviceController.getOneId)

module.exports = router