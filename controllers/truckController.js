const {Truck, Device} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class TruckController {
    async create(req, res, next){
        try{
            const {model, number, enabled, companyId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const truck = await Truck.create({model, number, enabled, img: fileName, companyId})
            return res.json(truck)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {companyId, limit, page} = req.query 
        page = page || 1
        limit = limit || 9 
        let offset = page * limit - limit
        let trucks
        if (!companyId) {
            trucks = await Truck.findAndCountAll({limit, offset})
        } 
        if(companyId) {
            trucks = await Truck.findAndCountAll({where: {companyId}, limit, offset})
        }
        return res.json(trucks)
    }
    

    async getOne(req, res){
        const {id} = req.params
        const truck = await Truck.findOne({where: {id}})
        return res.json(truck)
    }
}

module.exports = new TruckController()