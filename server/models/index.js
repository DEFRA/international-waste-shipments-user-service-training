'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)

// TODO: Move config to separate file
const config = {
  'username': process.env.IWS_POSTGRES_IWS_USER,
  'password': process.env.IWS_POSTGRES_IWS_PASSWORD,
  'database': process.env.IWS_POSTGRES_IWS_DATABASE,
  'host': process.env.IWS_POSTGRES_IWS_HOST || '127.0.0.1',
  'port': process.env.IWS_POSTGRES_HOST_PORT || 5332,
  'dialect': 'postgres'
}

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
