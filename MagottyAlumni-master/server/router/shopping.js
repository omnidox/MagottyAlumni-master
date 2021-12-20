/* eslint-disable */
const express = require('express')
const shopping = require('../model/products')
const router = express.Router()
const makeOrder = require('../model/orders')
const cart = require('../model/cart')

router.get('/detail', async (req, res)=>{
    const product = await shopping.findOne({path: req.query.id})
    return res.send(product)
})
router.get('/isEnough',async (req,res)=>{
   const foundProduct = await shopping.findOne({name:req.query.item})
    return res.send(foundProduct)
})
router.post('/success',async (req,res)=>{
    await new makeOrder(req.body).save()
    return res.send('success')

})
router.post('/clearCart',async (req,res)=>{
    const result = await cart.deleteOne({email:req.body.email,item:req.body.product})
    return res.send('success')

})
router.post('/reset',async (req,res)=>{
    await shopping.updateOne({name:req.body.product},{amount:req.body.newAmount})
    return res.send('success')
})
module.exports = router
