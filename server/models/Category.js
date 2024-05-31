const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
        category: {
                type: String,
                required: true
        },
        addedBy: {
                type: String,
                required: true
        }
}, { timestamps: true })

const CategoryModel = mongoose.model('category', categorySchema)

module.exports = CategoryModel