const mysql = require('mysql-await')
const { connection } = require('../core/db')

class Products {
  async getProductById(id) {
    const result = await connection().awaitQuery(
      'SELECT * FROM ok_products WHERE id = ? LIMIT 1', [id]
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async getProducts({
    mode = 'all',
    page = 1,
    itemsPerPage = 25,
    brandId,
    categoryId,
  } = {}) {
    const sql = `
      SELECT * FROM ok_products WHERE 1
      ${brandId    && 'AND brand_id    = ? '}
      ${categoryId && 'AND category_id = ? '}
      'LIMIT ? OFFSET ?'
    `

    const variables = []
    let query = 'SELECT * FROM ok_products '
    if (brandId) {
      query += 'WHERE brand_id = ? '
      variables.push(brandId)
    }
  
    if (categoryId) {
      query += 'WHERE category_id = ? '
      variables.push(categoryId)
    }
  
    query += 'LIMIT ? OFFSET ?'
    variables.push(itemsPerPage)
    variables.push((page - 1) * itemsPerPage)
    return await connection().awaitQuery(query, variables)
  }
}

module.exports = new Products()