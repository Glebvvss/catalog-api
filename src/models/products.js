const mysql          = require('mysql-await')
const { connection } = require('../core/db')
const {
  host,
  staticPath
} = require('../config/app')

const prepareProduct = product => {
  product.image_url = `${host}${staticPath}/products/${product.filename}`
  return product
}

class Products {
  async findOne(id) {
    const connect = await connection()

    const result = await connect.awaitQuery(`
      SELECT
        ok_products.*,
        ok_images.filename,
        ok_variants.price,
        ok_currencies.sign,
        ok_currencies.code
      FROM ok_products 
      LEFT JOIN ok_images
        ON ok_products.main_image_id=ok_images.id 
      LEFT JOIN ok_variants
        ON ok_products.id=ok_variants.product_id
      LEFT JOIN ok_currencies
        ON ok_variants.currency_id=ok_currencies.id
      WHERE ok_products.id = ?
      LIMIT 1`, 
      [id]
    )

    if (result.length === 0) {
      return null
    }

    return prepareProduct(result[0])
  }

  async findMany({
    mode = 'all',
    page = 1,
    itemsPerPage = 25,
    brandId,
    categoryId,
  } = {}) {
    const variables = []
    let query = `
      SELECT
        ok_products.*,
        ok_images.filename,
        ok_variants.price,
        ok_currencies.sign,
        ok_currencies.code
      FROM ok_products 
      LEFT JOIN ok_images
        ON ok_products.main_image_id=ok_images.id 
      LEFT JOIN ok_variants
        ON ok_products.id=ok_variants.product_id
      LEFT JOIN ok_currencies
        ON ok_variants.currency_id=ok_currencies.id
      WHERE 1 
    `
    if (brandId) {
      query += ' AND brand_id = ? '
      variables.push(brandId)
    }
  
    if (categoryId) {
      query += ' AND main_category_id = ? '
      variables.push(categoryId)
    }
  
    query += ' LIMIT ? OFFSET ?'
    variables.push(itemsPerPage)
    variables.push((page - 1) * itemsPerPage)

    const connect  = await connection()
    const products = await connect.awaitQuery(query, variables)
    return products.map(prepareProduct)
  }
}

module.exports = new Products()