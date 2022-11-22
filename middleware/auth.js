 const {StatusCodes} = require('http-status-codes')
 const jwt = require('jsonwebtoken')

 const authMiddleware = async (req,res,next) =>{
    try{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'no access token'})
    }
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
user = {username : decoded.user}
next()
 }
catch(error){
    console.log(error);
    return res.status(StatusCodes.FORBIDDEN).json({error:error.message})
} 
}

module.exports = authMiddleware