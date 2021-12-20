const mongoose = require('mongoose')
const {Schema, model} = mongoose

const cartSchema = new Schema({
    email:{type:String, require:true},
    item:{type:String,require: true},
    amount:{type:Number,require:true},
    path:{type:String, require: true},
    price:{type:Number,require:true},
    maxAmount: {type:Number,require:true},
})

const cart = model('shoppingcart', cartSchema)
module.exports = cart
