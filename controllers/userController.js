const {User, View} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role, companyId) => {
    return jwt.sign(
        {id, login, role, companyId}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )

}

class UserController {
    async registration(req, res, next){
        const {login, password, role, companyId} = req.body
        if(!login || !password){
            return next(ApiError.badRequest('Некоректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword, companyId} )
        const view = await View.create({userId: user.id})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role, user.companyId)
        return res.json({token})
    }

    async check(req, res, next){
        const user = await User.findOne({where: {id: req.user.id}})
        const token = generateJwt(req.user.id, req.user.login, req.user.role, user.companyId)
        return res.json({token})
    }
}

module.exports = new UserController()