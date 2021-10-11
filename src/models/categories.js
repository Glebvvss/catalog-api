const { sqlQuery } = require('../core/db')

class Categories {
  async findOne(id) {
    const result = await sqlQuery(
      'SELECT * FROM ok_categories WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async findAll({ limit = 1000 } = {}) {
    return await sqlQuery(
      'SELECT * FROM ok_categories LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Categories()