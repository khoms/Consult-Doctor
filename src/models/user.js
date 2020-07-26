const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//     name: {
const UserSchema =new  mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add yout name'],
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: [true,'Please add your email'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: [true,'Please add your password'],
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    phone:{
        type:String,
        maxLength:[10,'Phone number can not be longer than 10 characters']
    },
    address:{
        type:String
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=  await bcrypt.hash(this.password,salt);
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    }) ;
}

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
 

module.exports = mongoose.model('User',UserSchema);