const { Schema } = require('mongoose')
const { purchasePreSave } = require('@/utils')

module.exports = (db) => {
  const purchaseSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    provider: {
      type: String,
      default: ''
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
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
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
    note: {
      type: String,
      maxlength: 255,
      default: ''
    },
    total: {
      type: Number,
      default: 0,
      min: 0
    }
  }, {
    timestamps: true,
    versionKey: false
  })

  purchaseSchema.pre('save', purchasePreSave)

  return db.model('Purchase', purchaseSchema)
}
