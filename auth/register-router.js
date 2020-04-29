const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const router = express.Router();
const Users = require('../users/users-model');

router.post('/', async (req, res, next) => {
   
   let user = req.body;
   const hash = bcrypt.hashSync(user.password, 8);
   user.password = hash;

    try {
        const [registered] = await Users.add(user); 
        user.id = registered;
        const token = generateToken(user);
        delete user.password;
        res.status(201).json({ registered_user: user, token: token });
    }
    catch (error) {
        next(error);
    }
});

function generateToken(user) {

    const payload = {
        subject: user.id,
        username: user.username,
        roles: user.department
    };

    const options = {
        expiresIn: '10 min'
    }

    const token = jwt.sign(payload, secrets.JWT_SECRET, options);
    return token;
}


const errorHandler = ((error, req, res, next) => {
    res.status(500).json({ error: 'Server error: Recheck data and retry' });
    next();
});

router.use(errorHandler);


module.exports = router;
