const Router = require('express')
const router = new Router()

const truckRouter = require('./truckRouter')
const companyRouter = require('./companyRouter')
const userRouter = require('./userRouter') 
const deviceRouter = require('./deviceRouter')
const temperatureRouter = require('./temperatureRouter')
const humidityRouter = require('./humidityRouter')

router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/truck', truckRouter)
router.use('/device', deviceRouter)
router.use('/temperature', temperatureRouter)
router.use('/humidity', humidityRouter)



module.exports = router