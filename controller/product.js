const product = require('../models/product')
const {StatusCodes} = require('http-status-codes');


exports.createProducts = async (req,res)=>{
    try{const {products_name,price} = req.body
    if(!products_name || !price){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all the necessary information'})
    }
    const newProduct = product.create({...req.body})
    return res.status(StatusCodes.CREATED).json({newProduct})
}
catch(error){
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
}
}

exports.getAllProducts = async (req,res) =>{
try {
    const getAllProduct = await product.find({})
    if(!getAllProduct){
        return res.status(StatusCodes.NOT_FOUND).json({msg:'oops no products found'})
    }
    res.status(StatusCodes.OK).json({ Total_products:getAllProduct.length,getAllProduct})
} 
 catch (error) {
console.log(error);
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})    
}
}

exports.getSingleProducts = async (req, res) => {
    try{
        const {id:productsID} = req.params
const products = await product.findOne({_id:productsID})
if(!products){
    return res.status(StatusCodes.NOT_FOUND).json({msg:`there is no  id ${productsID} of such`})
}
return res.status(StatusCodes.OK).json({products})
}
catch(error){
    console.log(error);
}}

exports.UpdateProducts = async (req, res) => {
    try{
        //querying the database
const { params: {id:productsID}, body: {products_name,price}} = req
if(!products_name || !price){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:`please provide all the info`})
}
const UpdateProduct = await product.findByIdAndUpdate(
    {_id:productsID},
    req.body,
    {new:true,runValidator:true})

    if(!UpdateProduct){
        return res.status(StatusCodes.NOT_FOUND).json({msg:'product does not exist'})
    }
    return res.status(StatusCodes.CREATED).json({msg:UpdateProduct})
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

exports.deleteProducts = async (req, res) => {
try{
    //querying
    const {id:productsID} = req.params

    const deleteProduct = await product.findByIdAndDelete({_id:productsID})
    if(!deleteProduct){
        return res.status(StatusCodes.NOT_FOUND).json({msg:`product with id ${productsID} does not exist`})
    }
    return res.status(StatusCodes.OK).json({msg:'product deleted successfully'})
}
catch(error){
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
}
};