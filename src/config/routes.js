const express              = require('express')
const routes               = express.Router()
const brandsController     = require('../controllers/brandsController.js')
const productsController   = require('../controllers/productsController.js')
const notFoundController   = require('../controllers/notFoundController.js')
const categoriesController = require('../controllers/categoriesController.js')

routes.get('/brands',         brandsController.getAll)
routes.get('/brands/:id',     brandsController.getOne)
routes.get('/products',       productsController.getMany)
routes.get('/products/:id',   productsController.getOne)
routes.get('/categories',     categoriesController.getAll)
routes.get('/categories/:id', categoriesController.getOne)
routes.get('/:url',           notFoundController.notFound)
routes.get('/',               notFoundController.notFound)

module.exports = routes