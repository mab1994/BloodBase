const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Center = require('../models/Center');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// #Route: GET api/center/me  #Access: Private
// #Description: get current medical center profile
router.get('/me', auth, async (req, res) => {
    try {
        const center = await Center.findOne({ user: req.user.id })
            .populate('user', ['avatar', 'kind']);
        if (!center) {
            res.status(400)
                .json({ msg: 'cannot find profile for this medical center' })
        }
        else {
            res.json(center)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


// #Route: GET api/center  #Access: Public
// #Description: get all medical center profiles
router.get('/', async (req, res) => {
    try {
        const centers = await Center.find()
            .populate('user', ['avatar', 'kind']);
        res.json(centers)
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


// #Route: GET api/center/user/:user_id  #Access: Public
// #Description: get center profile by user ID
router.get('/user/:user_id', async (req, res) => {
    try {
        const center = await Center.findOne({ user: req.params.user_id })
            .populate('user', ['avatar', 'kind']);
        if (!center) return res.status(400).json({ msg: 'no center profile for this user!...' });
        res.json(center);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'no center profile for this user!...' });
        }
        res.status(500)
            .send('server error!...');
    }
})



// #Route: POST api/center  #Access: Private
// #Description: create medical center profile
router.post('/', [auth, [
    check('name', 'missing field!...').not().isEmpty(),
    check('ownership', 'missing field!...').not().isEmpty(),
    check('address', 'missing field!...').not().isEmpty(),
    check('city', 'missing field!...').not().isEmpty(),
    check('zipcode', 'missing field!...').not().isEmpty(),
    check('governorate', 'missing field!...').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ errors: errors.array() });
    }

    const { name, ownership, address, city, zipcode, governorate } = req.body;

    // :build medical center profile object
    const centerProfile = {};
    centerProfile.user = req.user.id;
    if (name) centerProfile.name = name;
    if (ownership) centerProfile.ownership = ownership;
    if (address) centerProfile.address = address;
    if (city) centerProfile.city = city;
    if (zipcode) centerProfile.zipcode = zipcode;
    if (governorate) centerProfile.governorate = governorate;

    try {
        let center = await Center.findOne({ user: req.user.id });
        if (center) {
            // :update medical center profile
            center = await Center.findOneAndUpdate(
                { user: req.user.id },
                { $set: centerProfile },
                { new: true }
            );
            return res.json(center)
        }

        // :create new medical center profile
        center = new Center(centerProfile);
        await center.save();
        res.json(center);

    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }


})

module.exports = router