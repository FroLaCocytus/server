const {Truck, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class TruckController {
    async create(req, res, next){
        try{
            const {model, number, regionNumber, companyId} = req.body
            let region_number = regionNumber
            const truck = await Truck.create({model, number, region_number, companyId})
            return res.json(truck)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateKey(req, res, next){
        const {id, connect_key} = req.body
        const truck = await Truck.update({ connect_key }, {where: { id }})
        return res.json(truck)
    }

    async getAll(req, res){
        let {companyId, limit, page} = req.query 
        page = page || 1
        limit = limit || 6 
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
        let {companyId} = req.query 
        const {id} = req.params
        const truck = await Truck.findOne({where: {id, companyId}})
        return res.json(truck)
    }

    async getOneId(req, res){
        let {connect_key} = req.query 
        const truck = await Truck.findOne({where: {connect_key}})
        return res.json(truck)
    }
}

module.exports = new TruckController()