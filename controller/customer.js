const { StatusCodes } = require('http-status-codes')
const customer = require('../models/customer')

exports.register = async (req,res) =>{
    try{
    const {username,email,password,confirmPassword} = req.body
    if  (!username || !email || !password || !confirmPassword){
return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all the required information'})
    }
    const user = await customer.findOne({email})
    if(user){
        res.status(StatusCodes.BAD_REQUEST).json({msg : `${req.body.email} already exist`})
    }
    const newUser = await customer.create({...req.body})
    const token = newUser.createJWT()
    return res.status(StatusCodes.CREATED).json({newUser,token})
}

catch(error){
console.log(error);
}
}

exports.login = async (req,res) =>{
    try{
    const {email,password} = req.body
    if(!email || !password){
     return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all the required information'})
    }
    const user = await customer.findOne({email})
        if(!user){
return res.status(StatusCodes.BAD_REQUEST).json({msg:'email does not exist'})
        }
        const suppliedPassword = await user.comparePassword(password)
        if(!suppliedPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'password is incorrect'})
        }
         const token = await user.createJWT()
         return res.status(StatusCodes.OK).json({user,token})
    }

    catch(error){
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}