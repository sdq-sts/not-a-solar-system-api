const { Schema } = require('mongoose')
const { purchasePreUpdate } = require('../helpers/mongoose')

module.exports = (db) => {
  const purchaseSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    nfe: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'pending'
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        amount: { type: Number, min: 1 },
        cost: { type: Number, min: 0 }
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  }, { versionKey: false })

  purchaseSchema.pre('update', purchasePreUpdate)

  return db.model('Purchase', purchaseSchema)
}
