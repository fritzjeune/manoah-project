
const express = require('express');
const router = express.Router();
const passport = require('passport');
const loanController = require('../controllers/Loan')
const { getPaymentsForLoan, createPayment } = require('../controllers/Payment')

// Loan routes
router.get('/approval-date', passport.authenticate('jwt', { session: false }), loanController.getLoansByApprovalDate);
router.get('/', passport.authenticate('jwt', { session: false }), loanController.getAllLoans);
router.get('/:loanId', passport.authenticate('jwt', { session: false }), loanController.getLoanById);
router.get('/:loanId/payments', passport.authenticate('jwt', { session: false }), getPaymentsForLoan);
router.post('/:loanId/payments', passport.authenticate('jwt', { session: false }), createPayment);
// router.post('/loans', passport.authenticate('jwt', { session: false }), loanController.createLoan);
// router.put('/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.updateLoan);
// router.delete('/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.deleteLoan);

module.exports = router;