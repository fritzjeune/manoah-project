const {
    User,
    Role
} = require('../config/sequelize'); // Assuming you've defined the User model
const bcrypt = require('bcrypt');

const UserController = {
    // Create a new user
    createUser: async (req, res) => {
        const userData = req.body;

        try {
            // Hash the user's password before saving it to the database
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;

            const newUser = await User.create(userData, {
                attributes: {exclude: ['password']},
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error, in creating the user' });
        }
    },

    // Update an existing user
    updateUser: async (req, res) => {
        const {
            userId
        } = req.params;
        try {
            const [updatedRowsCount, updatedUser] = await User.update(req.body, {
                where: {
                    user_id: userId
                },
                attributes: {exclude: ['password']},
                returning: true, // Return the updated user
            });
            if (updatedRowsCount > 0) {
                res.status(200).json(updatedUser[0]);
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        const {
            userId
        } = req.params;
        try {
            const deletedRowCount = await User.destroy({
                where: {
                    user_id: userId
                },
            });
            if (deletedRowCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },

    // Get a single user by ID
    getUserById: async (req, res) => {
        const {
            userId
        } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: {exclude: ['password']},
                include: [{model: Role}]
            });
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },

    changePassword: async (req, res) => {
        // TODO: 
        try {
            
        } catch (error) {
            
        }
    }
};

module.exports = UserController;