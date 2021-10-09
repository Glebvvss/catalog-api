const { connection } = require('../core/db')

class Brands {
  async findOne(id) {
    const connect = await connection()
    const result  = await connect.awaitQuery(
      'SELECT * FROM ok_brands WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async findAll({ limit = 1000 } = {}) {
    const connect = await connection()
    return await connect.awaitQuery(
      'SELECT * FROM ok_brands LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Brands()