const mysql = require('mysql-await')

const connection = () => mysql.createConnection({
  connectionLimit: 10,
  host: "catalog_mysql",
  user: "user",
  password: "password",
  database: "catalog"
})

module.exports = {
  connection
}