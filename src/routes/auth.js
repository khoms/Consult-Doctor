const express = require('express');
const {register,login}= require('../controller/auth');

const router = express.Router();

router.post('/register',register);
router.route('/login').post(login);
module.exports = router;