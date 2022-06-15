const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Temperature } = require('../models/models');

class temperatureController {

    async getAll(req, res){
        const {startDate, endDate} = req.query
        const temperature = await sequelize.query(`SELECT temperature, time FROM temperatures WHERE time BETWEEN now() - interval '24 hours' AND to_timestamp('${endDate}', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');`, { 
            type: QueryTypes.SELECT
        })
        return res.json(temperature)
    }
}
module.exports = new temperatureController()