const mysql = require('mysql-await')
const express = require('express')
const app = express()
const port = 9001

app.get('/', async (_, res) => {
  const connection = mysql.createConnection({
    connectionLimit: 10,
    host: "catalog_mysql",
    user: "user",
    password: "password",
    database: "catalog"
  })

  res.send(
    JSON.stringify(
      await connection.awaitQuery(`SHOW TABLES`)
    )
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})