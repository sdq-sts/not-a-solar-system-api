const HttpStatus = require('http-status')
const { defaultResponse, errorResponse } = require('../../helpers/responses')

class ProductsController {
  constructor (ProductsModel) {
    this.Products = ProductsModel
  }

  async getAll (req) {
    const queryParams = { ownerId: req.user.id }
    const limit = parseInt(req.query.limit) || 30
    const page = parseInt(req.query.page) || 1

    try {
      const products = await this.Products
        .find(queryParams)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)

      return defaultResponse(products)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }

    try {
      const newProduct = await this.Products.create(queryParams)
      return defaultResponse(newProduct, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const product = await this.Products.findOne(queryParams)
      return defaultResponse(product)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async update (req) {
    const queryParams = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const updatedProduct = await this.Products.update(queryParams, { $set: modifiedFields })
      return defaultResponse(updatedProduct)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedProduct = await this.Products.remove(queryParams)
      return defaultResponse(removedProduct, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const userId = req.user.id

    try {
      const documentCount = await this.Products.countDocuments({ ownerId: userId })
      return defaultResponse({ products_count: documentCount })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { ProductsController })
