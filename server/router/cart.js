const express = require('express')
const cart = require('../model/cart')
const router = express.Router()



router.get('/', async (req,res)=>{

    const userShoppingCart = await cart.find({email:req.query.email})

    return res.send(userShoppingCart)

})
router.post('/addToCart', async (req, res)=>{

    const data = await cart.findOne({email: req.body.email,path:req.body.path})

    if (data){
        return res.send("Item is already added in your cart.")
    }else{
        await new cart(req.body).save()

        return res.send("Item successfully added.")
    }
})
router.post('/changeAmount',async (req,res)=>{
    await cart.updateOne({path: req.body.path,email:req.body.email},{amount: req.body.amount})
    const userShoppingCart = await cart.find({email:req.body.email})
    return res.send(userShoppingCart)


})
router.post('/deleteItems',async (req,res)=>{
    await cart.deleteOne({email:req.body.email,path:req.body.path})
    const useShoppingCart = await cart.find({email:req.body.email})
    return res.send(useShoppingCart)

})

module.exports = router