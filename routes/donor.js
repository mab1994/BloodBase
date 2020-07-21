const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Donor = require('../models/Donor');
const User = require('../models/User');
const Report = require('../models/Report');
const { check, validationResult } = require('express-validator');

// #Route: GET api/donor/me  #Access: Private
// #Description: get current donor profile
router.get('/me', auth, async (req, res) => {
    try {
        const donor = await Donor.findOne({ user: req.user.id })
            .populate('user', ['avatar', 'kind']);
        if (!donor) {
            res.status(400)
                .json({ msg: 'cannot find profile for this donor' })
        }
        else {
            res.json(donor)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


// #Route: GET api/donor  #Access: Public
// #Description: get all donor profiles
router.get('/', async (req, res) => {
    try {
        const donors = await Donor.find()
            .populate('user', ['avatar', 'kind'])

        res.json(donors)
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


// #Route: GET api/donor/user/:user_id  #Access: Public
// #Description: get donor profile by user ID
router.get('/user/:user_id', async (req, res) => {
    try {
        const donor = await Donor.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar', 'kind'])
            
        if (!donor) return res.status(400).json({ msg: 'no donor profile for this user!...' });
        res.json(donors);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'no donor profile for this user!...' });
        }
        res.status(500)
            .send('server error!...');
    }
})


// #Route: POST api/donor  #Access: Private
// #Description: create donor profile - update existing one
router.post('/', [auth, [
    check('birthdate', 'missing field!...').not().isEmpty(),
    check('blood', 'missing field!...').not().isEmpty(),
    check('rhesus', 'missing field!...').not().isEmpty(),
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

    const { birthdate, blood, rhesus, address, city, zipcode, governorate, otherDiseases, infectiousDiseases, hematologicalDiseases } = req.body;

    // :build donor profile object
    const donorProfile = {};
    donorProfile.user = req.user.id;
    if (birthdate) donorProfile.birthdate = birthdate;
    if (blood) donorProfile.blood = blood;
    if (rhesus) donorProfile.rhesus = rhesus;
    if (address) donorProfile.address = address;
    if (city) donorProfile.city = city;
    if (zipcode) donorProfile.zipcode = zipcode;
    if (governorate) donorProfile.governorate = governorate;
    if (infectiousDiseases) {
        donorProfile.infectiousDiseases = infectiousDiseases.split(',').map(el => el.trim());
    }
    if (hematologicalDiseases) {
        donorProfile.hematologicalDiseases = hematologicalDiseases.split(',').map(el => el.trim());
    }
    if (otherDiseases) {
        donorProfile.otherDiseases = otherDiseases.split(', ').map(el => el.trim());
    }

    try {
        let donor = await Donor.findOne({ user: req.user.id });
        if (donor) {
            // :update donor profile
            donor = await Donor.findOneAndUpdate(
                { user: req.user.id },
                { $set: donorProfile },
                { new: true }
            );
            return res.json(donor)
        }

        // :create new donor profile
        donor = new Donor(donorProfile);
        await donor.save();
        res.json(donor);

    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }

    res.send('ok');

})


// #Route: PUT api/donor/donation  #Access: Private
// #Description: Insert donation
router.put('/donation', [auth, [
    check('date', 'required field!...').not().isEmpty(),
    check('next', 'required field!...').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ errors: errors.array() });
    }

    const {governorate, center, date, after, next} = req.body;
    const don = {
        governorate, 
        center,
        date,
        after,
        next
    };

    
    try {
        const donor = await Donor.findOne({ user: req.user.id })
        donor.donations.push(don);
        donor.save();
        
        res.json(donor)
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .send('server error!...');
    }
})


module.exports = router