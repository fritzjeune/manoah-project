// routes/Payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/Payment');
const passport = require('passport');

// Create a payment for a loan
router.post('/', passport.authenticate('jwt', { session: false }), paymentController.createPayment);

// Update a payment
router.put('/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.updatePayment);

// Delete a payment
router.delete('/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);

// Get all payments for a specific loan
router.get('/loan/:loanId', passport.authenticate('jwt', { session: false }), paymentController.getPaymentsForLoan);

module.exports = router;
