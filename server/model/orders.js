const mongoose = require('mongoose')
const {Schema, model} = mongoose

const orderSchema = new Schema({
    email:{type: String, require: true},
    orderNumber:{type:Number, require: true},
    status:{type:String, default: 'pending'},
    track:{type:String, default: 'hasn\'t shipped'},
    product:{type:String},
    amount:{type: Number, require: true},
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    cellphone:{type:String, require:true},
    streetAddress:{type:String, require:true},
    streetAddress2:{type:String},
    city:{type:String, require:true},
    state:{type:String, require:true},
    zipCode:{type:String, require:true},
})

const orderInfo = model('order', orderSchema)
module.exports = orderInfo
