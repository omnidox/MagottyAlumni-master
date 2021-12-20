const express = require('express')
const register = require('../model/register')
const router = express.Router()



router.post('/', async (req,res)=>{
    try {
        const user = await register.findOne({email:req.body.email})
        if (user.password === req.body.password) {
            return res.send(user)
        } else{
            return res.send("Please check your email and password")
        }
    } catch (err){
        return res.send("Please check your email and password")
    }
})

module.exports = router
