const express = require('express');
const cron = require('node-cron');
const cors = require('cors')
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
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
const loanRoutes = require('./routes/Loan');
const loginRoutes = require('./routes/Auth');
const versementRoutes = require('./routes/Versement');
const transactionRoutes = require('./routes/Transaction');
const session = require('express-session');
const verifyTokenInDatabase = require('./middlewares/Auth')
// const passportConfig = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3010;

// Cors policies
app.use(cors())

// initiating swagger in my app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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


// // Schedule a task to run every 15 seconds
// cron.schedule('*/15 * * * * *', () => {
//     // Your task logic goes here
//     console.log('Task executed every 15 seconds');
// });

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
app.use('/api/loans', loanRoutes);
app.use('/api/versements', versementRoutes);
app.use('/api/account', transactionRoutes);

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
