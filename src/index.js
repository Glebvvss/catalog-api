const app        = require('express')()
const brands     = require('./models/brands.js')
const products   = require('./models/products.js')
const categories = require('./models/categories.js')

app.get('/products', async (req, res) => {
  const page         = Number(req.query?.page || 1)
  const itemsPerPage = Number(req.query?.itemsPerPage || 25)
  const mode         = Number(req.query?.mode || 'all')
  const brandId      = Number(req.query?.brandId)
  const categoryId   = Number(req.query?.categoryId)
  res.send({
    meta: {
      'page':           page,
      'items_per_page': itemsPerPage,
    },
    data: await products.getProducts({
      mode,
      page,
      brandId,
      categoryId,
      itemsPerPage
    })
  })
})

app.get('/products/:id', async (req, res) => {
  const product = await products.getProduct(Number(req.params.id))
  if (!product) {
    res.statusCode = 404
  }

  res.send({
    meta: {},
    data: product
  })
})

app.get('/categories', async (_, res) => {
  res.send({
    meta: {},
    data: await categories.getCategories()
  })
})

app.get('/categories/:id', async (req, res) => {
  const category = await categories.getCategoryById(Number(req.params.id))
  if (!category) {
    res.statusCode = 404
  }

  res.send({
    meta: {},
    data: category
  })
})

app.get('/brands', async (_, res) => {
  res.send({
    meta: {},
    data: await brands.getBrands()
  })
})

app.get('/brands/:id', async (req, res) => {
  const brand = await brands.getBrandById(Number(req.params.id))
  if (!brand) {
    res.statusCode = 404
  }

  res.send({
    meta: {},
    data: brand
  })
})

app.get('/ping', async (_, res) => {
  res.send('pong');
})

app.get('/:url', async (req, res) => {
  res.statusCode = 404
  res.send({
    meta: {},
    data: null
  })
})

const PORT = 9001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})