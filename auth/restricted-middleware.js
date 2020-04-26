const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]; //strips off "bearer" type from token

        if (token) {
            jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'You shall not pass!' });
                }
                else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        }
        else {
            res.status(401).json({ error: 'Must be logged in and authorized' });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'You shall not pass!' });
    }
};

