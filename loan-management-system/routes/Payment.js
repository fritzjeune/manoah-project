// routes/Payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/Payment');
const passport = require('passport');

// Update a payment
router.put('/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.updatePayment);

// // Delete a payment
// router.delete('/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);


module.exports = router;
