const mongoose = require('mongoose')
const {Schema, model} = mongoose

const careerSchema = new Schema({
    title:{type: String, require},
    content:{type: String, require},
    sortDate:{type: Number, require},
    date:{type: String, require},
    path:{type: String, require},
})

const careerInfo = model('new', careerSchema)
module.exports = careerInfo
