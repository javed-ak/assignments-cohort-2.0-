// Middleware for handling auth
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config');

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const jwtToken = token.split(' ')[1];
    const decodedValue = jwt.verify(jwtToken, SECRET_KEY);
    if(decodedValue.username) {
        next();
    } else {
        res.status(403).json({
            message: "You are not authenticated!"
        })
    }
}

module.exports = adminMiddleware;