module.exports = roles => {
    return function (req, res, next) {
        if (req.decodedToken.roles && req.decodedToken.roles.includes(roles)) {
            next();
        }
        else if (req.decodedToken.roles && req.decodedToken.roles.includes('ADMIN')) {
            next();
        }
        else {
            // server understood request but will not authorize
            res.status(403).json({ message: 'Role not authorized' }); 
        }
    }
}
