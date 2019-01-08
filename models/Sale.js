const { Schema } = require('mongoose')
const { salePreSave } = require('../helpers/mongoose')

module.exports = (db) => {
  const saleSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'confirmed'
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        amount: { type: Number, min: 1 },
        price: { type: Number, min: 0 }
      }
    ],
    total: {
      type: Number,
      default: 0
    }
  }, {
    timestamps: true,
    versionKey: false
  })

  saleSchema.pre('save', salePreSave)

  return db.model('Sale', saleSchema)
}
