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

const priceHistorySchema = new Schema({
        price: {
                type: Number,
                required: true
        },
        discountType: {
                type: String,
                enum: ["Percentage", "Fixed"],
                default: "Percentage"
        },
        date: {
                type: Date,
                default: Date.now
        },

})

const productSchema = new Schema({
        title: {
                type: String,
                required: true
        },
        price: {
                type: Number,
                required: true
        },
        priceHistory: [priceHistorySchema],
        category: {
                type: String,
                required: true,
        },
        condition: {
                type: String,
                required: true
        },
        size: {
                type: String,
                required: true
        },
        addedBy: String,
        intendedFor: String,
        brand: String,
        materialUsed: String,
        issue: String,
        status: {
                type: String,
                enum: ["Available", "Sold", "Archive", "Pending"],
                default: "Available"
        },

        file: fileUploadSchema

}, { timestamps: true })

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel