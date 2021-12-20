const express = require('express')
const register = require('../model/register')
const router = express.Router()
const mailer = require('nodemailer')



router.post('/', async (req, res)=>{
    const user = await register.findOne({email: req.body.email})
    if (user){
        return res.send("User already exist")
    }else{
        await new register(req.body).save()
        return res.send("register successfully")
    }
})

router.get('/user', async (req,res)=>{
    const list = await register.find()
    res.send(list)
})

router.get('/check', async (req, res)=>{
    const foundUser = await register.findOne({email: req.query.email})
    if (foundUser === null){
        return res.send('not found')
    } else {
        return res.send('user exist')
    }
})

module.exports = router
