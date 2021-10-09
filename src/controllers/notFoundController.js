class NotFoundController {
  async notFound(_, response) {
    response.statusCode = 404
    response.send({
      meta: {},
      data: null
    })    
  }
}

module.exports = new NotFoundController()