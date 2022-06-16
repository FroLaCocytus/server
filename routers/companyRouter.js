const Router = require('express')
const router = new Router()
const companyController = require('../controllers/companyController')
const checkRole = require('..//middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), companyController.create)
router.get('/', companyController.getAll)
router.get('/one', companyController.getOne)


module.exports = router