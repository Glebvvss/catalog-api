const express = require('express')
const app = express()
const port = 9001
const mysql = require('mysql-await')

const connection = () => mysql.createConnection({
  connectionLimit: 10,
  host: "catalog_mysql",
  user: "user",
  password: "password",
  database: "catalog"
})

app.get('/api/products', async (req, res) => {
  const page         = Number(req.query?.page || 1)
  const itemsPerPage = Number(req.query?.itemsPerPage || 25)
  const mode         = Number(req.query?.mode || 'all')
  const brandId      = Number(req.query?.brandId)
  const categoryId   = Number(req.query?.categoryId)
  res.send({
    meta: {
      "page":           page,
      "items_per_page": itemsPerPage,
    },
    data: await connection().awaitQuery('SELECT * FROM ok_products LIMIT ? OFFSET ?', [ itemsPerPage, (page - 1) * itemsPerPage ])
  })
})

app.get('/', async (_, res) => {
  const connect = connection()
  res.send(
    JSON.stringify(
      await connect.awaitQuery(`SHOW TABLES`)
    )
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})