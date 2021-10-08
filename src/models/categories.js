const mysql = require('mysql-await')
const { connection } = require('../core/db')

class Categories {
  async getCategoryById(id) {
    const result = await connection().awaitQuery(
      'SELECT * FROM ok_categories WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async getCategories({ limit = 1000 } = {}) {
    return await connection().awaitQuery(
      'SELECT * FROM ok_categories LIMIT ?',
      [limit]
    )
  }
}

module.exports = new Categories()