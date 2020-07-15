const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/user')

//get all users
//Route GET/users
exports.getUsers =async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json({success:true,count:users.length,data:users});
        
    } catch (error) {
        res.status(400).json({success:false})
    }
    // res.status(200).json({success:true,msg:'Show all users'});

}

//get single users
//Route GET/users/:id
exports.getUser =async(req,res,next)=>{
    try { 
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorResponse('USer not found with id of'+ req.params.id ,404));
        }
        res.status(200).json({success:true,data:user});
    } catch (err) {
        // res.status(400).json({success:false})
        next(err);
    }
    // res.status(200).json({success:true,msg:'Show user'+req.params.id});

}

//create new user
//Route POST/users
exports.createUser =async(req,res,next)=>{

    try {
        const user = await User.create(req.body);
        res.status(201).json({success:true,data:user});
        
    } catch (err) {
        next(err);
        // res.status(400).json({success:false})
    }
    // console.log(req.body);
    // res.status(200).json({success:true,msg:'Created new User'});
   
}

//update user
//Route PUT/users/:id
exports.updateUser =async(req,res,next)=>{
   try {
       const user = await User.findByIdAndUpdate(req.params.id,req.body,{
           new:true,
           runValidators:true
       });
       if(!user){
           return res.status(400).json({success:false});
       }
       res.status(200).json({success:true,data:user});
   } catch (err) {
    res.status(400).json({success:false});
   } 
    // res.status(200).json({success:true,msg:'Update user'+req.params.id});
}

//delete user
//Route GET/users/:id
exports.deleteUser =async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:{}});
    } catch (err) {
     res.status(400).json({success:false});
    }

    // res.status(200).json({success:true,msg:'Delete user'+req.params.id});
}

