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
router.delete('/:id', auth, async (req, res) => {
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


// #Route: PUT api/demand/participate/:id  #Access: Private
// #Description: i am in 
router.put('/:id', auth, async (req, res) => {
    try {
        const demand = await Demand.findById(req.params.id);

        // :check if demand has already been marked
        if (demand.received.filter(it => it.user.toString() === req.user.id).length > 0) {
            res.json(400).json({msg: 'you already participated!...'})
        }
        demand.received.unshift({user: req.user.id});

        await demand.save();

        res.json(demand.received)
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg:'demand not found!...'})
        }
        res.status(500)
            .send('server error!...');
    }
} );


// #Route: PUT api/demand/unparticipate/:id  #Access: Private
// #Description: i am not in anymore
router.put('/:id', auth, async (req, res) => {
    try {
        const demand = await Demand.findById(req.params.id);

        // :check if demand has already been marked
        if (demand.received.filter(it => it.user.toString() === req.user.id).length === 0) {
            res.json(400).json({msg: 'you have not yet participated!...'})
        }
        
        // :get remove index
        const removeIndex = demand.received.map(el => el.user.toString()).indexOf(req.user.id)
        demand.received.splice(removeIndex, 1)

        await demand.save();
        res.json(demand.received)
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg:'demand not found!...'})
        }
        res.status(500)
            .send('server error!...');
    }
} );


// #Route: POST api/demand/comment/:id  #Access: Private
// #Description: create a comment
router.post('/comment/:id', [auth, [
    check('content', 'missing field!...').not().isEmpty
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ errors: errors.array() });
    }


    try {
        const user = await User.findById(req.user.id).select('-password')
        const demand = await Demand.findById(req.params.id)

        const comment = {
            content: req.body.content,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        demand.comments.unshift(comment)

        await demand.save();
        res.json(demand.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }


})


// #Route: DELETE api/demand/comment/:id/:cmnt_id  #Access: Private
// #Description: delete comment
router.delete('/comment/:id/:cmnt_id', auth, async (req, res) => {
    try {
        const demand = await Demand.findById(req.params.id)

        // :extract comment
        const comment = demand.comments.find(c => c.id === req.params.cmnt_id)

        // :verify if comment exists
        if (!comment) { res.status(404).json({msg:'comment not found!...'}) }

        // :verify user
        if (comment.user.toString() !== req.user.id) {
            res.status(401).json({msg:'not authorized!...'})
        }

        // :get remove index
        const removeIndex = demand.comments.map(el => el.user.toString()).indexOf(req.user.id)
        demand.comments.splice(removeIndex, 1)

        await demand.save();
        res.json(demand.comments)
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


module.exports = router