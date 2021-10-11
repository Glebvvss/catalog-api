const mysql  = require('mysql-await')
const dbConf = require('../config/db')
const pool   = mysql.createPool(dbConf)

const sqlQuery = async (sql, variables) => {
  const connect = await pool.awaitGetConnection()
  const result  = await connect.awaitQuery(sql, variables)
  connect.release()
  return result
}

module.exports = { sqlQuery }