const { Schema } = require('mongoose')
const { purchasePreSave, purchasePreUpdate } = require('../helpers/mongoose')

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
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    payment: {
      type: String,
      enum: ['cash', 'installment'],
      default: 'cash'
    },
    note: {
      type: String,
      maxlength: 255,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  }, { versionKey: false })

  purchaseSchema.pre('save', purchasePreSave)
  purchaseSchema.pre('update', purchasePreUpdate)

  return db.model('Purchase', purchaseSchema)
}
