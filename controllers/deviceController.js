const {Device} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Temperature} = require('../models/models')
const {Humidity} = require('../models/models')

class DeviceController {
    async create(req, res){
        const {device_number, enabled, truckId} = req.body
        const device = await Device.create({device_number, enabled, truckId})
        return res.json(device)
    }

    async getOne(req, res){
        let {device_number} = req.query 
        const device = await Device.findOne({where: {device_number}})
        return res.json(device)
    }
    async getOneId(req, res){
        const {truckId} = req.query
        const device = await Device.findOne({where: {truckId}})
        return res.json(device)
    }

    async createAll(req, res){
        const {deviceId, enabled, time, temperature, humidity} = req.body
        await Temperature.create({time, temperature, deviceId})
        await Humidity.create({time, humidity, deviceId})
        await Device.update({ enabled }, {where: { id: deviceId }})
        return res.json("{}")
    }

}

module.exports = new DeviceController()