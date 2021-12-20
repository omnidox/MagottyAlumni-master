const mongoose = require('mongoose')
const {Schema, model} = mongoose

const eventsSchema = new Schema({
    title:{type: String, require},
    content:{type: String, require},
    date:{type: String, require},
    category:{type: String, require},
    sortDate:{type: Number, require},
})

const eventInfo = model('event', eventsSchema)
module.exports = eventInfo
