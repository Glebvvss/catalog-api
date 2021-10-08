const { connection } = require('../core/db')

class Brands {
  async getBrandById(id) {
    const result = await connection().awaitQuery(
      'SELECT * FROM ok_brands WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async getBrands({ limit = 1000 } = {}) {
    return await connection().awaitQuery(
      'SELECT * FROM ok_brands LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Brands()