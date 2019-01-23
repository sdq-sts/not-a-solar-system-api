const authPath = require('./paths/auth.json')
const usersPath = require('./paths/users.json')
const salesPath = require('./paths/sales.json')
const productsPath = require('./paths/products.json')
const purchasesPath = require('./paths/purchases.json')

const userDef = require('./definitions/user.json')
const productDef = require('./definitions/product.json')
const saleDef = require('./definitions/sale.json')
const purchaseDef = require('./definitions/purchase.json')

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Not a solar system',
    description: 'A small system, not a solar system'
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  tags: [
    { name: 'Auth', description: 'API to get the JWT in the system' },
    { name: 'Users', description: 'API for users in the system' },
    { name: 'Products', description: 'API for products in the system' },
    { name: 'Sales', description: 'API for sales in the system' },
    { name: 'Purchases', description: 'API for purchases in the system' }
  ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  paths: {
    ...authPath,
    ...usersPath,
    ...productsPath,
    ...salesPath,
    ...purchasesPath
  },
  definitions: {
    ...userDef,
    ...saleDef,
    ...productDef,
    ...purchaseDef
  }
}
