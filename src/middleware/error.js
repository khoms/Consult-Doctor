const ErrorResponse = require('../utils/errorResponse');

const errorHandler =(err,req,res,next)=>{
    let error ={...err}
    error.message= err.message;
    //Log into console for dev
    console.log(err.stack);
    
    //Mongoose Bad object id
    if(err.name ==='CastError'){
        const message =`Bootcamp not found with id ${err.value}`; 
        error = new ErrorResponse(message,404);
    }


    res.status(error.statusCode|| 500).json({
        success:false,
        error:error.message || 'Server Error'
    });


}

module.exports = errorHandler;
