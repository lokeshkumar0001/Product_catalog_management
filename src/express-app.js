const express = require('express')

const cors = require('cors')


const { userRoute, productRoute } = require('./api/router')

module.exports = async(app) =>{
    app.use(express.json())
    app.use(cors())
    
    app.use("/api/user",userRoute)
    app.use("/api/product",productRoute)

    app.use("/*",(req,res,next)=>{
        res.send('Route not found')
    })
}