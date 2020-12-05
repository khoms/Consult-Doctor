const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const history = mongoose.model('history', {
//     name: {
const HistorySchema =new  mongoose.Schema({
    doctorId:{
        type:String,
        required:[true,'Doctor ID is required']
    },
    doctorName:{
        type:String,
        required:[true,'Doctor Name is required']
    },
    userId:{
        type:String,
        required:[true,'User ID is required']
    },
    title: {
        type: String,
        required: [true,'Please add title'],
        trim: true,
        // unique:true
    },
    prescription: {
        type: String,
        required: [true,'Please add prescription'],
        trim: true,
        lowercase: true,
    },
    medicines: {
        type: String,
        trim: true,
       
    },
    date:{
        type:Date
    }
    
    

    
});
 

module.exports = mongoose.model('History',HistorySchema);