const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

const User = require('../models/user')

//get all users
//Route GET/users
exports.getUsers =async(req,res,next)=>{
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
        query = User.find(JSON.parse(queryStr));

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
        const users = await query;

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


//upload photo
//Route PUT/users/:id/photo
exports.userPhotoUpload =async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorResponse('USer not found with id of'+ req.params.id ,404));
        }

        if(!req.files){
            return next(new ErrorResponse('Please upload a file',400));
        }

        const file = req.files.file;

        //Make sure that the image is a foto
        if(!file.mimetype.startsWith('image')){
            return next(new ErrorResponse('Please upload an image file',400));
        }

        //Check file size
        if(file.size>process.env.MAX_FILE_UPLOAD){
            return next(new ErrorResponse('Please upload an image file less than' + process.env.MAX_FILE_UPLOAD,400));
        }

        //Changing the name of photo/ rename
        // file.name= `photo_${user._id}${path.parse(file.name).ext}`;
        file.name= `photo_${user._id}${path.parse(file.name).ext}`;
        console.log(file.name); 

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
            if(err){
                console.log(err);
                return next(new ErrorResponse('Problem with file upload',500));
            }
            
            await User.findByIdAndUpdate(req.params.id,{photo:file.name});
            
            res.status(200).json({
                success:true,
                data:file.name
            })
        })
       
    } catch (err) {
     res.status(400).json({success:false});
     console.log(err.message)
    }

    // res.status(200).json({success:true,msg:'Delete user'+req.params.id});
}
