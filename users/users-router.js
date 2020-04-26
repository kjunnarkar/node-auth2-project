const express = require('express');
const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/check-role-middleware');
const Users = require('../users/users-model');

const router = express.Router();

router.get('/', restricted, checkRole('DEPARTMENT'), async (req, res, next) => {

    try {
        const results = await Users.get();
            res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});

// Probably not relevant for this project since we are not clearing local storage
// Seems we cannot delete the token like we could destroy sessions
// Just have to wait for token to expire
router.delete('/logout', (req, res) => {
    localStorage.clear();
});


const errorHandler = ((error, req, res, next) =>{
    res.status(500).json({ error: 'Server error: check data and retry' });
    next();
});

router.use(errorHandler);


module.exports = router;
