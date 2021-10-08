const mysql = require('mysql-await')
const { connection } = require('../core/db')

class Products {
  async getProductById(id) {
    const result = await connection().awaitQuery(
      `
        SELECT ok_products.*, ok_images.url as image_url 
        FROM ok_products 
        LEFT JOIN ON ok_products.main_image_id=ok_images.id 
        WHERE id = ? LIMIT 1`, [id]
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
    const variables = []
    let query = `
      SELECT ok_products.*, ok_images.filename
      FROM ok_products 
      LEFT JOIN ON ok_products.main_image_id=ok_images.id 
      WHERE 1 
    `
    if (brandId) {
      query += ' AND brand_id = ? '
      variables.push(brandId)
    }
  
    if (categoryId) {
      query += ' AND category_id = ? '
      variables.push(categoryId)
    }
  
    query += ' LIMIT ? OFFSET ?'
    variables.push(itemsPerPage)
    variables.push((page - 1) * itemsPerPage)
    return await connection().awaitQuery(query, variables)
  }
}

module.exports = new Products()