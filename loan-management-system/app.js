const express = require('express');
const passport = require('passport');
const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
const {
    sequelize,
    User
} = require('./config/sequelize');
const userRoutes = require('./routes/User');
const borrowerRoutes = require('./routes/Borrower');
const loginRoutes = require('./routes/Auth');
const session = require('express-session');
const verifyTokenInDatabase = require('./middlewares/Auth')
// const passportConfig = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3000;


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

// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(
    session({
        secret: 'SuperSecret',
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize Passport before routes
app.use(passport.initialize());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/borrower', borrowerRoutes);

// Apply verification middleware after initializing Passport
app.use(verifyTokenInDatabase);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during database synchronization:', err);
        process.exit(1);
    });

// Add a global event listener for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
