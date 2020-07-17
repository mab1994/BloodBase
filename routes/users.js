const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const User = require('../models/User');


// #Route: POST api/users  #Access: Public
// #Description: User register
router.post('/', [
    check('email', 'required field! missing email...').isEmail(),
    check('password', 'required field! missing or wrong password...').not().isEmpty().isLength({ min: 8 }),
    check('kind', 'required field! missing kind...').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, kind } = req.body

    try {

        // :check if user exists
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'existing user!...' }] });
        }

        // :get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // :new user to database
        user = new User({
            email,
            password,
            kind,
            avatar
        });

        // :hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // :save new user
        await user.save();

        // :return jw token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error!...')
    }
});

module.exports = router;