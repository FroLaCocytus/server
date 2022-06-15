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
    connect_key: {type: DataTypes.STRING},
})

const Company = sequelize.define('company',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Device = sequelize.define('device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_number: {type: DataTypes.STRING, allowNull: false},
    enabled: {type: DataTypes.BOOLEAN, defaultValue: "false"},
})

const Temperature = sequelize.define('temperature',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time: {type: DataTypes.DATE},
    temperature: {type: DataTypes.FLOAT},
})

const Humidity = sequelize.define('humidity',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time: {type: DataTypes.DATE},
    humidity: {type: DataTypes.FLOAT},
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

Device.hasMany(Temperature)
Temperature.belongsTo(Device)

Device.hasMany(Humidity)
Humidity.belongsTo(Device)

module.exports = {
    User,
    View,
    ViewTruck,
    Truck,
    Company,
    Device,
    Humidity,
    Temperature
}