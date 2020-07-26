//Logs request to console

const logger =(req,res,next)=>{
    console.log(req.method + req.protocal +'://'+req.get('host')+ req.originalUrl);
    next();
};

module.exports = logger;