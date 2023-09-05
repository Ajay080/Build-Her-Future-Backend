const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        // validate(value){
        //     if(value.toString().toLowerCase().include('password')){
        //         throw new Error('Password must not contains "password"')
        //     }
        // }
    },
    role:{
        type:String,
        require:true,
        default:'user'
    },

    // tokens:[{// it will have its own id...that is called sub document
    //     token:{
    //         type:String,
    //         required:true,
    //     } 
    // }],
},{
    timestamps:true
})

// userSchema.methods.toJSON=function(){
//     const user=this
//     const userObject= user.toObject()
//     // delete userObject.tokens
//     // delete userObject.password
//     return userObject
// }





userSchema.methods.generateAuthToken=async function(){// to define a new methods for user router
    const user=this
    const token=jwt.sign({_id:user._id.toString(), role:user.toString()},process.env.JWT_SECRET)

    //to concat token in dbms
    // user.tokens=user.tokens.concat({token})
    // await user.save()
    return token
}

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error ('Unable to login')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}


 


// Hash the plain text password before saivng 
//We have to pass the second argument as schema ot get advantage of middle ware
userSchema.pre('save',async function(next){//standard function because arrow function dont bind this
    // this.//this will access to user that is about to save
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    //here we hash the password
    console.log('just before save')

    //when this async function is done , we will call next otherwise it will hang forever
    next()

})

// userSchema.pre('remove',async function (next){
//     const user=this
//     await Task.deleteMany({owner:user._id})
//     next()
// })

const User= mongoose.model('User', userSchema)

module.exports=User
