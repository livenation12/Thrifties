const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bagSchema = new Schema({
          productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
          },
          userId: {
                    type: String,
                    required: true
          }
}, { timestamps: true })

const BagModel = mongoose.model('bags', bagSchema)

module.exports = BagModel