
const express = require('express');
const router = express.Router();
const passport = require('passport');
const loanController = require('../controllers/Loan')
const { getPaymentsForLoan, createPayment, payVersement } = require('../controllers/Versement')
const pledgeController = require('../controllers/Pledge')
const referencePersonController = require('../controllers/ReferencePerson')

// Loan routes
router.get('/approval-date', passport.authenticate('jwt', { session: false }), loanController.getLoansByApprovalDate);
router.get('/', passport.authenticate('jwt', { session: false }), loanController.getAllLoans);
router.get('/loans-by-date', passport.authenticate('jwt', { session: false }), loanController.checkLoanIrregulations);
router.get('/:loanId', passport.authenticate('jwt', { session: false }), loanController.getLoanById);

// router.get('/:loanId/payments', passport.authenticate('jwt', { session: false }), getPaymentsForLoan);
// router.post('/:loanId/payments', passport.authenticate('jwt', { session: false }), createPayment);

router.post('/:loanId/approuve-loan', passport.authenticate('jwt', { session: false }), loanController.approuveLoan);
router.post('/:loanId/deny-loan', passport.authenticate('jwt', { session: false }), loanController.deniedLoan);
router.post('/:loanId/disburse', passport.authenticate('jwt', { session: false }), loanController.disburseLoan);

// Payment
router.post('/:loanId/versements/:versementId/pay', passport.authenticate('jwt', { session: false }), payVersement);
// router.delete('/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.deleteLoan);

// Pledge routes
router.get('/:loanId/pledge/', passport.authenticate('jwt', { session: false }), pledgeController.getAllPledges);
router.get('/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.getPledgeById);
router.post('/:loanId/pledge/', passport.authenticate('jwt', { session: false }), pledgeController.createPledge);
router.put('/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.updatePledge);
router.delete('/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.deletePledge);

// Reference Persons
// router.post('/:loanId/reference-persons/', passport.authenticate('jwt', { session: false }), referencePersonController.addReferencePerson);
// router.put('/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.updateReferencePerson);
// router.delete('/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.deleteReferencePerson);
router.get('/:loanId/reference-persons', passport.authenticate('jwt', { session: false }), referencePersonController.getAllReferencePersonsByLoan);
router.get('/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.getReferencePersonById);

module.exports = router;