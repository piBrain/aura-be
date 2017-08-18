var config = require('../../../config')
config()

module.exports = {
  "local": {
    "url": process.env.DATABASE_URL,
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 10,
      idle: 10000,
      acquire: 200000,
    },
    retry: {
      max: 1,
    }
  },
  "production": {
    "url": process.env.PROD_DATABASE_URL,
    "dialect": "postgres"
  }
}
