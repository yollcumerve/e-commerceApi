const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')
const dbConnect = require('../modules/dbConnection')
const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productsId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    adress: {
        type: Object,
        required:true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)