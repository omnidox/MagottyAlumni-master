const mongoose = require('mongoose')
const {Schema, model} = mongoose

const productSchema = new Schema({
    name:{type: String, require: true},
    price:{type: Number, require: true},
    size:{type: String, require: true},
    amount:{type: Number, require: true},
    description:{type: String, require: true},
    category:{type: String, require: true},
    path:{type:String, require: true},
})

const productInfo = model('product', productSchema)
module.exports = productInfo
