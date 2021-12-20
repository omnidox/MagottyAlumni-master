const express = require('express')
const events = require('../model/events')
const router = express.Router()

router.get('', async (req, res)=>{
    return res.send(await events.find().sort({sortDate: -1}))
})

router.get('/volunteer', async (req, res)=>{
    return res.send(await events.find({category: "Volunteer Events"}).sort({sortDate:-1}))
})

router.get('/alumnievent', async (req, res)=>{
    return res.send(await events.find({category: "Alumni Events"}).sort({sortDate:-1}))
})

module.exports = router
