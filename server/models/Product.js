const mongoose = require('mongoose')


const Schema = mongoose.Schema

const fileUploadSchema = new Schema({
        fieldName: String,
        originalName: String,
        encoding: String,
        mimeType: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
})

const productSchema = new Schema({
        category: {
                type: String,
                required: true,
        },
        condition: {
                type: String,
                required: true
        },
        file: fileUploadSchema

}, { timestamps: true })

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel