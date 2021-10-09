const brands = require('../models/brands.js')

class BrandsController {
  async getAll(_, response) {
    response.send({
      meta: {},
      data: await brands.findAll()
    })
  }

  async getOne(request, response) {
    const brand = await brands.findOne(Number(request.params.id))
    if (!brand) {
      res.statusCode = 404
    }
  
    response.send({
      meta: {},
      data: brand
    })
  }
}

module.exports = new BrandsController()