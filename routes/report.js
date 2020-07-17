const express = require('express')
const router = express.Router();

// #Route: GET api/report  #Access: Private
// #Description: just testing
router.get('/', (req, res) => res.send('report route ...'))

module.exports = router