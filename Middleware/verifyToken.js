const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization_token']
        if (!token) {
            return res.json({
                message: 'No token provided',
                status: 403
            })
        } else {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            req.employee = decoded;
            next();
        }

        
    } catch (error) {
        return res.json({
            error: error.message,
            message: 'Invalid token',
            status: 401
        })
    }
}

module.exports = {
    verifyToken
}