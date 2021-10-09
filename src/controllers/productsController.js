const products   = require('../models/products.js')

class ProductsController {
  async getMany(request, response) {
    const page         = Number(request.query?.page || 1)
    const itemsPerPage = Number(request.query?.itemsPerPage || 25)
    const mode         = String(request.query?.mode || 'all')
    const brandId      = Number(request.query?.brandId)
    const categoryId   = Number(request.query?.categoryId)
    response.send({
      meta: {
        'page':           page,
        'items_per_page': itemsPerPage,
      },
      data: await products.findMany({
        mode,
        page,
        brandId,
        categoryId,
        itemsPerPage
      })
    })
  }

  async getOne(request, response) {
    const product = await products.findOne(Number(request.params.id))
    if (!product) {
      response.statusCode = 404
    }
  
    response.send({
      meta: {},
      data: product
    })
  }
}

module.exports = new ProductsController()