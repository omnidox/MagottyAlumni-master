const express = require('express')
const news = require('../model/news')
const events = require('../model/events')
const router = express.Router()

router.get('/news', async (req, res)=>{
    const list = await news.find().sort({sortDate:-1})
    return res.send(list)
})

router.get('/news/page', async (req, res)=>{
    const urlObj = req.query
    const list = await news.find().sort({sortDate:-1}).skip(10*(urlObj.page-1)).limit(10)
    return res.send(list)
})

router.get('/news/detail', async (req, res)=>{
    const event = await news.findOne({sortDate: req.query.id})
    return res.send(event)
})

router.get('/events', async (req, res)=>{
    const list = await events.find().sort({sortDate:-1})
    return res.send(list)
})

router.get('/events/page', async (req, res)=>{
    const urlObj = req.query
    const list = await events.find().sort({sortDate:-1}).skip(10*(urlObj.page-1)).limit(10)
    return res.send(list)
})

router.get('/events/detail', async (req, res)=>{
    const event = await events.findOne({sortDate: req.query.id})
    return res.send(event)
})

module.exports = router
