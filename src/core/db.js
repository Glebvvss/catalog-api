const mysql  = require('mysql-await')
const dbConf = require('../config/db')
const pool   = mysql.createPool(dbConf)

const connection = async () => await pool.awaitGetConnection()

module.exports = {
  connection
}