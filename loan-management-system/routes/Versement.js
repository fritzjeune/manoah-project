// routes/Payment.js
const express = require('express');
const router = express.Router();
const versementController = require('../controllers/Versement');
const passport = require('passport');

// Update a payment
router.put('/:versementId', passport.authenticate('jwt', { session: false }), versementController.updatePayment);

// // Delete a payment
// router.delete('/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);


module.exports = router;
