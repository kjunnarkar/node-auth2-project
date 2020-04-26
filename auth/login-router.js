const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const router = express.Router();
const Users = require('../users/users-model');


router.post('/', async (req, res, next) => {

    let { username, password } = req.body;

    try {
        const loggedIn = await Users.findBy({ username }).first();
        
        if (loggedIn && bcrypt.compareSync(password, loggedIn.password)) {
            const token = generateToken(loggedIn);
            res.status(200).json({ username: `Welcome ${loggedIn.username}`, token: token });
        }
        else {
            res.status(401).json({ message: 'You shall not pass!' });
        }
    }
    catch (error) {
        next(error);
    }
});

function generateToken(user) {

    const payload = {
        subject: user.id,
        username: user.username,
        roles: ['DEPARTMENT']
    }

    const options = {
        expiresIn: '10 min'
    }

    const token = jwt.sign(payload, secrets.JWT_SECRET, options);
    return token;
}

const errorHandler = ((error, req, res, next) => {
    res.status(500).json({ error: 'Server error: check data and retry' });
    next();
});

router.use(errorHandler);


module.exports = router;
