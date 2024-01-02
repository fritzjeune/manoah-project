const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

// Create a new user
router.post('/', UserController.createUser);

// Update an existing user
router.put('/:userId', UserController.updateUser);

// Delete a user
router.delete('/:userId', UserController.deleteUser);

// Get a single user by ID
router.get('/:userId', UserController.getUserById);

// Get all users
router.get('/', UserController.getAllUsers);

module.exports = router;
