const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')

const customersSchema = mongoose.Schema({
    username:{
        type:String,
        min:[3,'username is too short']
    },
    email:{
        type:String,
        validate:[validator.isEmail,'email is invalid']
    },
    password:{
        type:String,
        min:[3,'password is too short']
    },
    confirmPassword:{
        type:String,
        validate:{
            validator:function(el){
                return el === this.password
            }}
    }
})

//a pre hook that hash the password supplied by the user bf it is saved to the database
customersSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    this.confirmPassword = undefined
})

//creating jwt for each user
customersSchema.methods.createJWT = function () {
    return JWT.sign({id:this._id,username:this.username},
                    process.env.JWT_SECRET,
                    {expiresIn:process.env.JWT_EXPIRES})
}

//comparing the password
customersSchema.methods.comparePassword = async function (candidatePassword) {
const isMatch = await bcrypt.compare(candidatePassword,this.password)
return isMatch
}

module.exports = mongoose.model('customer',customersSchema)