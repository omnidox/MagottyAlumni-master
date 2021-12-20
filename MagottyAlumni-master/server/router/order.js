const express = require('express')
const order = require('../model/orders')
const product = require('../model/products')
const router = express.Router()

router.post('/isEnough',async (req,res)=>{
    const availableAmount = await product.find({product : req.body.product})
    return res.send(availableAmount)

})