const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./src/middleware/logger');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./server/middleware/error');
const connectDB = require('./config/db');

//Route files 
const admin= require('./server/routes/admin')
const user= require('./server/routes/user')
const doctor = require('./server/routes/doctor')
const healthCenter = require('./server/routes/healthCenter')

const auth= require('./server/routes/auth')
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect Db
connectDB();

const app = express();

//Body parser

app.use(express.json());
// app.use(logger);
//Dev logging middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Mount routers
app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/doctor',doctor);
app.use('/api/healthCenter',healthCenter);
app.use('/api/admin',admin)

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    // 192.168.1.164:5000/api/admin,
    console.log('Server running in '+ process.env.NODE_ENV +' mode on port '+PORT)
    );


