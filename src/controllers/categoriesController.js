const categories = require('../models/categories.js')

class CategoriesController {
  async getAll(_, response) {
    response.send({
      meta: {},
      data: await categories.findAll()
    })
  }

  async getOne(request, response) {
    const category = await categories.findOne(Number(request.params.id))
    if (!category) {
      res.statusCode = 404
    }
  
    response.send({
      meta: {},
      data: category
    })
  }
}

module.exports = new CategoriesController()