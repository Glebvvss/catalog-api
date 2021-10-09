GET /products       - get list of prodicts
  query:
    page:         number
    itemsPerPage: number
    categoryId:   number
    brandId:      number

GET /product/:id    - get single product by id
GET /categories     - get list of categories
GET /categories/:id - get single category by id
GET /brands         - get list of brands
GET /brands/:id     - get single brand