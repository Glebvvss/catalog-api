const mysql = require('mysql-await')
const { connection } = require('../core/db')

class Categories {
  async findOne(id) {
    const connect = await connection()

    const result = await connect.awaitQuery(
      'SELECT * FROM ok_categories WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async findAll({ limit = 1000 } = {}) {
    const connect = await connection()
    return await connect.awaitQuery(
      'SELECT * FROM ok_categories LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Categories()