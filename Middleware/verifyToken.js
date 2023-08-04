const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization_token']
        if (!token) {
            return res.json({
                message: 'No token provided'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    verifyToken
}