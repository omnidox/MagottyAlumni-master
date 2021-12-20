// Project By The Mondays
// Rafael Hidalgo
// Nesreen Salah
// Davaughn Hoots
// Laura Paulino





const express = require('express')
const app = new express
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./router')
const mongo = require('./config/db')


mongo(app)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
routes(app)

app.set('port', 3000);

app.use('/upload', express.static(__dirname + '/upload'));

app.listen(app.get('port'), ()=>{
    console.log(`server running at http://localhost:${app.get('port')}`)
})
