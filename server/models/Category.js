const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
        category: {
                type: String,
                required: true
        },
        addedBy: String
}, { timestamps: true })

const CategoryModel = mongoose.model('categories', categorySchema)

module.exports = CategoryModel