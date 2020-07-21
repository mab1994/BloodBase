const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const Demand = require('../models/Demand')
const User = require('../models/User')

// #Route: POST api/demand  #Access: Private
// #Description: create demand for donation
router.post('/', [auth, [
    check('content', 'missing field!...').not().isEmpty
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ errors: errors.array() });
    }


    try {
        const user = await User.findById(req.user.id).select('-password')
        const demand = new Demand({
            content: req.body.content,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        await demand.save();
        res.json(demand);

    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }


})


// #Route: GET api/demand  #Access: Public
// #Description: Get all demands
router.get('/', async (req, res) => {
    try {
        const demands = await Demand.find().sort({ date: -1 });
        res.json(demands);
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
} );


// #Route: GET api/demand/:id  #Access: Private
// #Description: Get single demand by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const demands = await Demand.findById(req.params.id);

        if (!demands) {
            return res.status(404).json({msg:'demand not found!...'})
        }

        res.json(demands);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg:'demand not found!...'})
        }
        res.status(500)
            .send('server error!...');
    }
} );


// #Route: DELETE api/demand/:id  #Access: Private
// #Description: delete demand
router.get('/:id', auth, async (req, res) => {
    try {
        const demand = await Demand.findById(req.params.id);

        if (!demand) {
            return res.status(404).json({msg:'demand not found!...'})
        }
        
        // :check user
        if (demand.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'not authorized!...'})
        }

        await demand.remove();

        res.json({msg: 'removed...'});
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg:'demand not found!...'})
        }
        res.status(500)
            .send('server error!...');
    }
} );


module.exports = router