const express = require('express')


const { getHistories, getHistory,createHistory, updateHistory, deleteHistory} = require('../controller/history');

const router = new express.Router();
router.route('/').get(getHistories).post(createHistory);

router.route('/:id').get(getHistory).put(updateHistory).delete(deleteHistory);



module.exports = router