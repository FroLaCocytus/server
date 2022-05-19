const Router = require('express')
const router = new Router()

const truckRouter = require('./truckRouter')
const companyRouter = require('./companyRouter')
const userRouter = require('./userRouter') 

router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/truck', truckRouter)


module.exports = router