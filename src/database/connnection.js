const mongoose = require('mongoose')
const { DB_URL } = require('../config')

module.exports = async() =>{
   await mongoose.connect(DB_URL)
    .then(()=> console.log('connected to mongoDB database'))
    .catch(err=> console.log(err.message))
}