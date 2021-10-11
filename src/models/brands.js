const { sqlQuery } = require('../core/db')

class Brands {
  async findOne(id) {
    const result  = await sqlQuery('SELECT * FROM ok_brands WHERE id = ? LIMIT 1', [id])
    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async findAll({ limit = 1000 } = {}) {
    return await sqlQuery(
      'SELECT * FROM ok_brands LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Brands()