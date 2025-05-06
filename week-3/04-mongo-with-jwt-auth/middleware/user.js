const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const jwtToken = token.split(' ')[1];
    const validateToken = jwt.verify(jwtToken, SECRET_KEY);

    if(validateToken.username) {
        req.username = validateToken.username;
        next();
    } else {
        res.status(403).json({
            message: "Yor are not authenticated!"
        })
    }
}

module.exports = userMiddleware;