const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const View = sequelize.define('view',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ViewTruck = sequelize.define('view_truck',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Truck = sequelize.define('truck',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING, unique: true},
    region_number: {type: DataTypes.INTEGER},
    enabled: {type: DataTypes.BOOLEAN, defaultValue: "false"},
    img: {type: DataTypes.STRING, defaultValue: "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"}
})

const Company = sequelize.define('company',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Device = sequelize.define('device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_number: {type: DataTypes.STRING, allowNull: false},
    temperature: {type: DataTypes.FLOAT},
    humidity: {type: DataTypes.FLOAT},
    solenoid: {type: DataTypes.BOOLEAN}
})

User.hasOne(View)
View.belongsTo(User)

View.hasMany(ViewTruck)
ViewTruck.belongsTo(View)

Truck.hasOne(ViewTruck)
ViewTruck.belongsTo(Truck)

Truck.hasOne(Device)
Device.belongsTo(Truck)

Company.hasMany(Truck)
Truck.belongsTo(Company)

Company.hasMany(User)
User.belongsTo(Company)

module.exports = {
    User,
    View,
    ViewTruck,
    Truck,
    Company,
    Device
}