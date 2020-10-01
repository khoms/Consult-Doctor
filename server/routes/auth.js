const express = require('express');
const {register,login}= require('../controller/auth');

const router = new express.Router();

router.route('/register',register);
router.route('/login').post(login);

// console.log('recieved');
module.exports = router;