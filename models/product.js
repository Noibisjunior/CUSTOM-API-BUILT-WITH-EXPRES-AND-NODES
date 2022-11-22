const mongoose = require('mongoose')
const productsSchema = mongoose.Schema({
    products_name:{
        type:String
    },
    price:{
        type:String
    }
})
module.exports = mongoose.model('product',productsSchema)