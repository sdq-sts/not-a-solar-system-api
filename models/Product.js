const { Schema } = require('mongoose')
const { productPreUpdate } = require('../helpers/mongoose')

module.exports = (db) => {
  const productSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    description: { type: String },
    image: { type: String, default: '' },
    barCode: { type: String },
    internalCode: { type: String },
    changeStorage: { type: Boolean },
    isActive: { type: Boolean },
    currentStorage: { type: Number },
    costPrice: { type: Number },
    salePrice: { type: Number },
    weight: { type: Number },
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    minStorage: { type: Number },
    maxStorage: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  }, { versionKey: false })

  productSchema.pre('update', productPreUpdate)

  return db.model('Product', productSchema)
}
