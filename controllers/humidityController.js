const { QueryTypes } = require('sequelize');
const sequelize = require('../db')

class humidityController {

    async getAll(req, res){
        const {startDate, endDate} = req.query
        console.log("humidityController")
        console.log(req.query)
        const humidity = await sequelize.query(`SELECT humidity, time FROM humidities WHERE time BETWEEN now() - interval '2 hours' AND to_timestamp('${endDate}', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');`, { type: QueryTypes.SELECT })
        return res.json(humidity)
    }
}

module.exports = new humidityController()