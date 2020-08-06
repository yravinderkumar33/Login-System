const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { Authorization } = req.headers;
    const decodedToken = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTY2NDkyNzQsImRhdGEiOiI1ZjJhY2ZiZjg4MWViODEzYzI0NWMwYjYiLCJpYXQiOjE1OTY2NDU2NzR9.Y3DiUlwtCL7dsrKOptnEDD7L_MRGlUktfNRU1i-Tj5c");
    
}