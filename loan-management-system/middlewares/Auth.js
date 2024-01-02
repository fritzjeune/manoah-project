const { Token } = require('../config/sequelize')
const {
    ExtractJwt
} = require('passport-jwt');

const verifyTokenInDatabase = async (req, res, next) => {
    console.log(req)
    try {
        const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        // console.log(tokenFromHeader)

        // Check if the token exists in the Token table
        let token = await Token.findOne({
            where: {
                token: tokenFromHeader
            }
        });

        if (token) {
            token = token.toJSON()
            console.log(token)
            // If the token exists, proceed to the next middleware
            req.token = token
            return next();
        } else {
            return res.status(401).json({ message: 'Token not found in database' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyTokenInDatabase