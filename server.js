const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./src/middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Route files 
const user= require('./src/routes/user')
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

//Mount routers
app.use('/api/user',user);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log('Server running in '+ process.env.NODE_ENV +' mode on port '+PORT)
    );


