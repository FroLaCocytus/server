const {Company} = require('../models/models')
const ApiError = require('../error/ApiError')

class CompanyController {
    async create(req, res){
        const {name} = req.body
        const company = await Company.create({name})
        return res.json(company)
    }

    async getAll(req, res){
        const company = await Company.findAll() 
        return res.json(company)
    }
}

module.exports = new CompanyController()