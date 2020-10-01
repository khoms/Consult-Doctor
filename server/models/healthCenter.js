const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//     name: {
const HealthCenterSchema =new  mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add Doctors name'],
        trim: true,
        unique:true
    },
    phone:{
        type:Number,
        maxLength:[10,'Phone number can not be longer than 10 characters']
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
    services:{
        type:String,
        required:[true,'Please add Doctors Qualifications']
    },
    doctors:{
        type:String,
        required:[true,'Please add Doctors working place']
    }
});

//Encrypt password using bcrypt
// HealthCenterSchema.pre('save',async function(next){
//     const salt = await bcrypt.genSalt(10);
//     this.password=  await bcrypt.hash(this.password,salt);
// })

//Sign JWT and return
// HealthCenterSchema.methods.getSignedJwtToken = function(){
//     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE
//     }) ;
// }

//Match user entered password to hashed password in database
// DoctorSchema.methods.matchPassword =async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);

// }
 

module.exports = mongoose.model('Health Center',HealthCenterSchema);