// controllers/Auth.js

const {
    Token,
    User,
    Role
} = require('../config/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const generateTokens = (userId) => {
    const accessToken = jwt.sign({
        sub: userId
    }, 'SecretAccess', {
        expiresIn: '1h'
    }); // Adjust expiration as needed
    const refreshToken = jwt.sign({
        sub: userId
    }, 'SecretRefresh', {
        expiresIn: '7d'
    }); // Adjust expiration as needed

    return {
        accessToken,
        refreshToken
    };
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({
            where: {
                username
            },
            include: [{model: Role}]
        });

        // If user not found or password is incorrect, return unauthorized
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // User is authenticated, generate tokens
        const {
            accessToken,
            refreshToken
        } = generateTokens(user.user_id);

        // Save the refresh token to the user in the database
        await Token.create({
            token: accessToken,
            refresh_token: refreshToken,
            user_id: user.user_id
        })
        let logUser = Object.assign(user)
        logUser.password = null

        res.status(200).json({
            user: logUser,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        // Extract user ID from the current authenticated user


        if (!req.user) {
            return res.status(401).json({
                message: 'No user found'
            });
        }

        const userId = req.user.user_id;

        // Extract refresh token from the request body
        const actualRefreshToken = req.body.refreshToken;

        // Decode the refresh token to verify its expiration
        const decodedRefreshToken = jwt.verify(actualRefreshToken, 'SecretRefresh');

        // Check if the decoded refresh token is still valid
        const storedToken = await Token.findOne({
            where: {
                refresh_token: actualRefreshToken,
                user_id: userId,
            },
        });

        if (!storedToken || decodedRefreshToken.exp < Date.now() / 1000) {
            // If the token is not found or expired, return unauthorized
            return res.status(401).json({
                message: 'Invalid refresh token'
            });
        }

        // Generate new access and refresh tokens
        const {
            accessToken,
            refreshToken
        } = generateTokens(userId);

        // Update the refresh token in the database
        await Token.update({
            token: accessToken,
            refresh_token : refreshToken
        }, {
            where: {
                user_id: userId
            },
        });

        res.json({
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const logout = async (req, res) => {
    console.log(req.user.user_id)
    const userId = req.user ? req.user.user_id : null;

    try {
        if (userId) {
            // Remove the refresh token from the database
            await Token.destroy({
                where: {
                    user_id: userId,
                },
            }).then(() => {
                req.logout(() => {
                    return res.status(200).json({
                        message: 'Logout successful',
                    });
                });
            });
        }

        // Clear the session and log the user out
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


module.exports = {
    logout,
    login,
    refreshAccessToken
};