const mongoose = require('mongoose')

const Schema = mongoose.Schema()


const conditionSchema = new Schema({
        condition: {
                type: String,
                required: true
        },
        addedBy: {
                type: String,
                required: true
        }
}, { timestamps: true })

const ConditionModel = mongoose.model('conditions', conditionSchema)

module.exports = ConditionModel