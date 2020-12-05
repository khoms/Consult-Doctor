const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//     name: {
const DoctorSchema =new  mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add Doctors name'],
        trim: true,
        unique:true
    },
    nmcNo: {
        type: String,
        required: [true,'Please add NMCnUM'],
        trim: true,
        unique:true,
        lowercase: true
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // }
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
    qualification:{
        type:String,
        required:[true,'Please add Doctors Qualifications']
    },
    worksAt:{
        type:Array,
        required:[true,'Please add Doctors working place']
    },
    noOfCases:{
        type:Number
    },
    speciality:{
        type:String,
        required:[true,'Please add Doctors Speciality']
    }
});

//Encrypt password using bcrypt
DoctorSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=  await bcrypt.hash(this.password,salt);
})

//Sign JWT and return
DoctorSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    }) ;
}

//Match user entered password to hashed password in database
DoctorSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
 

module.exports = mongoose.model('Doctor',DoctorSchema);