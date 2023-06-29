const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const rankingController = require('../controllers/rankingController');

router.use('/auth', authController);
router.use('/rankings', rankingController);

module.exports = router;