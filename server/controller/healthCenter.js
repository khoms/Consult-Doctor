const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

const HealthCenter = require('../models/healthCenter');

//get all healthCenters
//Route GET/healthCenters
exports.getHealthCenters =async(req,res,next)=>{
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
        query = HealthCenter.find(JSON.parse(queryStr));

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
        const healthCenters = await query;

        res.status(200).json({success:true,count:healthCenters.length,data:healthCenters});
        
    } catch (error) {
        res.status(400).json({success:false})  
    }
    // res.status(200).json({success:true,msg:'Show all users'});

}

//get single healthCenter
//Route GET/users/:id
exports.getHealthCenter =async(req,res,next)=>{
    try { 
        const healthCenter = await HealthCenter.findById(req.params.id);
        if(!healthCenter){
            return next(new ErrorResponse('Health Center not found with id of'+ req.params.id ,404));
        }
        res.status(200).json({success:true,data:healthCenter});
    } catch (err) {
        // res.status(400).json({success:false})
        next(err);
    }
    // res.status(200).json({success:true,msg:'Show user'+req.params.id});

}

//create new healthCenter
//Route POST/healthCenter
exports.createHealthCenter =async(req,res,next)=>{

    try {
        const healthCenter = await HealthCenter.create(req.body);
        res.status(201).json({success:true,data:healthCenter});
        
    } catch (err) {
        console.log('error Occured')
        next(err);
        // res.status(400).json({success:false})
    }
    // console.log(req.body);
    // res.status(200).json({success:true,msg:'Created new User'});
   
}

//update healthCenter
//Route PUT/healthCenters/:id
exports.updateHealthCenter =async(req,res,next)=>{
   try {
       const healthCenter = await HealthCenter.findByIdAndUpdate(req.params.id,req.body,{
           new:true,
           runValidators:true
       });
       if(!healthCenter){
           return res.status(400).json({success:false});
       }
       res.status(200).json({success:true,data:healthCenter});
   } catch (err) {
    res.status(400).json({success:false});
   } 
    // res.status(200).json({success:true,msg:'Update user'+req.params.id});
}

//delete healthCenter
//Route GET/healthCenters/:id
exports.deleteHealthCenter =async(req,res,next)=>{
    try {
        const healthCenter = await HealthCenter.findByIdAndDelete(req.params.id);
        if(!healthCenter){
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
exports.healthCenterPhotoUpload =async(req,res,next)=>{
    try {
        const healthCenter = await HealthCenter.findById(req.params.id);
        if(!healthCenter){
            return next(new ErrorResponse('Health Center not found with id of'+ req.params.id ,404));
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
        file.name= `photo_${healthCenter._id}${path.parse(file.name).ext}`;
        console.log(file.name); 

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
            if(err){
                console.log(err);
                return next(new ErrorResponse('Problem with file upload',500));
            }
            
            await HealthCenter.findByIdAndUpdate(req.params.id,{photo:file.name});
            
            res.status(200).json({
                success:true,
                data:file.name
            })
        })
       
    } catch (err) {
     res.status(400).json({success:false});
    }

    // res.status(200).json({success:true,msg:'Delete user'+req.params.id});
}
