const HttpStatus = require('http-status')
const { defaultResponse, errorResponse } = require('@/utils')

class ProductsController {
  constructor (models) {
    const { Product } = models
    this.Products = Product
  }

  async getAll (req) {
    const search = new RegExp(req.query.search, 'gi') || ''
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const queryParams = { ownerId: req.user.id, name: search }

    try {
      const products = await this.Products
        .find(queryParams)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .cache({ key: req.user.id })

      return defaultResponse(products)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const product = await this.Products
        .findOne(queryParams)
        .cache({ key: req.user.id })

      return defaultResponse(product)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }

    try {
      const newProduct = await this.Products
        .create(queryParams)

      return defaultResponse(newProduct, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async update (req) {
    const queryParams = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const updatedProduct = await this.Products
        .updateOne(queryParams, { $set: modifiedFields })

      return defaultResponse(updatedProduct)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedProduct = await this.Products
        .remove(queryParams)

      return defaultResponse(removedProduct, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const userId = req.user.id

    try {
      const documentCount = await this.Products
        .countDocuments({ ownerId: userId })

      return defaultResponse({ productsCount: documentCount })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { ProductsController })
