const express = require('express')
const user = require('../model/register')
const router = express.Router()

router.get('/', async(req, res)=>{
    const foundUser = await user.findOne({email: req.query.email})
    return res.send(foundUser)
})

router.post('/change', async(req, res) => {
    const myQuery = {email: req.body.email}
    const newValues = {$set: {password: req.body.password}}
    await user.updateOne(myQuery, newValues)
    return res.send('success')
})

module.exports = router
