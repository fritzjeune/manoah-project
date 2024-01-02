const passport = require('passport');
const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
const bcrypt = require('bcrypt');
const {
    User,
    Token
} = require('../config/sequelize'); // Adjust the import path based on your project structure

// Serialization and Deserialization
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SecretAccess', // Replace with your actual secret key
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            console.log("object")
            // Your existing verification logic here
            const user = await User.findOne({
                where: {
                    user_id: jwtPayload.sub
                }
            });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'User not found for the given token' });
            }
        } catch (error) {
            return done(error, false);
        }
    })
);
