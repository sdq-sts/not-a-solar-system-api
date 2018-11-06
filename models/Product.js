const { Schema } = require('mongoose')
const { productPreUpdate } = require('../helpers/mongoose')

module.exports = (db) => {
  const productSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    description: { type: String },
    image: { type: String, default: '' },
    bar_code: { type: String },
    internal_code: { type: String },
    change_storage: { type: Boolean },
    is_active: { type: Boolean },
    current_storage: { type: Number },
    cost_price: { type: Number },
    sale_price: { type: Number },
    weight: { type: Number },
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    min_storage: { type: Number },
    max_storage: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
  }, { versionKey: false })

  productSchema.pre('update', productPreUpdate)

  return db.model('Product', productSchema)
}
