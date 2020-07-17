const express = require('express')
const router = express.Router();

// #Route: GET api/demand  #Access: Private
// #Description: just testing
router.get('/', (req, res) => res.send('demand route ...'))

module.exports = router