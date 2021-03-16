const express = require('express');
const {register,login,loginAdmin,loginDoctor}= require('../controller/auth');

const router = new express.Router();

router.route('/register',register);
router.route('/login').post(login);
router.route('/loginAdmin').post(loginAdmin);
router.route('/loginDoctor').post(loginDoctor);

// console.log('recieved');
module.exports = router;