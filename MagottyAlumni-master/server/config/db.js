const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/maggottyAlumni'

module.exports = app => {
    mongoose.connect(mongoUrl, {useNewUrlParser:true, useFindAndModify:true, useUnifiedTopology:true}, ()=>{
        console.log('Database connected')
    })
}