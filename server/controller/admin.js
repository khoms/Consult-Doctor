const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

const Admin = require('../models/admin')

//get all users
//Route GET/users
exports.getAdmins =async(req,res,next)=>{
    try {
        let query;

        //Copy req.QUery
        const reqQuery= {...req.query};

        //Fields to exclude
        const removeFields =['select','sort'];

        //Lop over removeFields and delete them from reqQuery
        removeFields.forEach(param=>delete reqQuery[param]);
        
        // console.log(reqQuery);

        //Create query string
        let queryStr = JSON.stringify(reqQuery);

        //Finding resource
        query = Admin.find(JSON.parse(queryStr));

        //Select fields
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            // console.log(fields)
            query = query.select(fields);
        }

        //Sort fields
        if(req.query.sort){
            const sortBy= req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);  
        }

        //Executing query
        const admins = await query;

        res.status(200).json({success:true,count:admins.length,data:admins});
        
    } catch (error) {
        res.status(400).json({success:false})  
    }
    // res.status(200).json({success:true,msg:'Show all users'});

}

//get single users
//Route GET/users/:id
exports.getAdmin =async(req,res,next)=>{
    try { 
        const admin = await Admin.findById(req.params.id);
        if(!admin){
            return next(new ErrorResponse('Admin not found with id of'+ req.params.id ,404));
        }
        res.status(200).json({success:true,data:admin});
    } catch (err) {
        // res.status(400).json({success:false})
        next(err);
    }
    // res.status(200).json({success:true,msg:'Show user'+req.params.id});

}

//create new user
//Route POST/users
exports.createAdmin =async(req,res,next)=>{

    try {
        const admin = await Admin.create(req.body);
        res.status(201).json({success:true,data:admin});
        
    } catch (err) {
        next(err);
        // res.status(400).json({success:false})
    }
    // console.log(req.body);
    // res.status(200).json({success:true,msg:'Created new User'});
   
}

//update user
//Route PUT/users/:id
exports.updateAdmin =async(req,res,next)=>{
   try {
       const admin = await Admin.findByIdAndUpdate(req.params.id,req.body,{
           new:true,
           runValidators:true
       });
       if(!admin){
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
exports.deleteAdmin =async(req,res,next)=>{
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if(!admin){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:{}});
    } catch (err) {
     res.status(400).json({success:false});
    }

    // res.status(200).json({success:true,msg:'Delete user'+req.params.id});
}


    // res.status(200).json({success:true,msg:'Delete user'+req.params.id});

