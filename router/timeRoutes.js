const express = require('express');
const timeController = require('../controller/timeController');

const router = express.Router();

router.post('/', timeController.createTime);
router.get('/', timeController.getAllTimes);
router.get('/:time_id', timeController.getTimeById);
router.put('/:time_id', timeController.updateTime);
router.delete('/:time_id', timeController.deleteTime);

module.exports = router;