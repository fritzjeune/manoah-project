const express = require('express');
const router = express.Router();
const passport = require('passport');
const borrowerController = require('../controllers/Borrower');
const addressController = require('../controllers/Address');
const contactController = require('../controllers/Contact');
const loanController = require('../controllers/Loan')
const paymentController = require('../controllers/Versement')
const pledgeController = require('../controllers/Pledge')
const referencePersonController = require('../controllers/ReferencePerson');
const { getBorrowerAccount, createBorrowerAccount, getBorrowerAccounts } = require('../controllers/BorrowerAccount');

// Define routes for Borrower
/**
 * @swagger
 *   tags:
 *     - Borrowers
 * /api/borrowers:
 *   get:
 *     summary: Get all borrowers
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *          description: Error getting borrowers
 */
router.get('/', passport.authenticate('jwt', { session: false }), borrowerController.getAllBorrowers);
router.get('/:id', passport.authenticate('jwt', { session: false }), borrowerController.getBorrowerById);
router.post('/', passport.authenticate('jwt', { session: false }), borrowerController.createBorrower);
router.put('/:id', passport.authenticate('jwt', { session: false }), borrowerController.updateBorrower);
router.delete('/:id', passport.authenticate('jwt', { session: false }), borrowerController.deleteBorrower);

// Define routes for Address
router.post('/:borrowerId/address', passport.authenticate('jwt', { session: false }), addressController.createAddress);

// Define routes for Accounts
router.get('/:borrowerId/accounts/:accountId', passport.authenticate('jwt', { session: false }), getBorrowerAccount );
router.get('/:borrowerId/accounts', passport.authenticate('jwt', { session: false }), getBorrowerAccounts );
router.post('/:borrowerId/accounts', passport.authenticate('jwt', { session: false }), createBorrowerAccount );

// Define routes for Contact
router.post('/:borrowerId/contact', passport.authenticate('jwt', { session: false }), contactController.createContact);

// Loan routes
// router.get('/:borrowerId/loans/approval-date', passport.authenticate('jwt', { session: false }), loanController.getLoansByApprovalDate);
router.get('/:borrowerId/loans', passport.authenticate('jwt', { session: false }), loanController.getAllLoansForBorrower);
router.get('/:borrowerId/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.getLoanById);
router.post('/:borrowerId/loans', passport.authenticate('jwt', { session: false }), loanController.createLoan);
router.put('/:borrowerId/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.updateLoan);
router.delete('/:borrowerId/loans/:loanId', passport.authenticate('jwt', { session: false }), loanController.deleteLoan);

// Payment routes
// router.post('/:borrowerId/loans/:loanId/payments/', passport.authenticate('jwt', { session: false }), paymentController.createPayment);
// router.put('/:borrowerId/loans/:loanId/payments/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.updatePayment);
// router.delete('/:borrowerId/loans/:loanId/payments/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);
// // router.get('/:borrowerId/loans/:loanId/payments/:paymentId', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);
// router.get('/:borrowerId/loans/:loanId/payments/', passport.authenticate('jwt', { session: false }), paymentController.getPaymentsForLoan);

// Pledge routes
router.get('/:borrowerId/loans/:loanId/pledge/', passport.authenticate('jwt', { session: false }), pledgeController.getAllPledges);
router.get('/:borrowerId/loans/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.getPledgeById);
router.post('/:borrowerId/loans/:loanId/pledge/', passport.authenticate('jwt', { session: false }), pledgeController.createPledge);
router.put('/:borrowerId/loans/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.updatePledge);
router.delete('/:borrowerId/loans/:loanId/pledge/:id', passport.authenticate('jwt', { session: false }), pledgeController.deletePledge);

// Reference person routes
router.post('/:borrowerId/loans/:loanId/reference-persons/', passport.authenticate('jwt', { session: false }), referencePersonController.addReferencePerson);
router.put('/:borrowerId/loans/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.updateReferencePerson);
router.delete('/:borrowerId/loans/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.deleteReferencePerson);
router.get('/:borrowerId/loans/:loanId/reference-persons/', passport.authenticate('jwt', { session: false }), referencePersonController.getAllReferencePersons);
router.get('/:borrowerId/loans/:loanId/reference-persons/:id', passport.authenticate('jwt', { session: false }), referencePersonController.getReferencePersonById);

module.exports = router;
