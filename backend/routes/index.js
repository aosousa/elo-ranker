const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.json({ title: 'ELO Ranker', version: '1.0.0' }));

module.exports = router;