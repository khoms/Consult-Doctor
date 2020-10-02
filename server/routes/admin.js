const express = require('express')


const { getAdmins,getAdmin,createAdmin, updateAdmin } = require('../controller/admin');

const router = new express.Router();
router.route('/').get(getAdmins).post(createAdmin);
// router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getAdmin).put(updateAdmin)
module.exports = router