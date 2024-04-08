const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Deposit, withDraw, getBorrowerAccount } = require("../controllers/BorrowerAccount")


// router.get('/', passport.authenticate('jwt', { session: false }), borrowerController.getAllBorrowers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getBorrowerAccount);
// router.get('/', passport.authenticate('jwt', { session: false }), borrowerController.getBorrowerById);
// router.post('/', passport.authenticate('jwt', { session: false }), borrowerController.createBorrower);
// router.put('/:id', passport.authenticate('jwt', { session: false }), borrowerController.updateBorrower);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), borrowerController.deleteBorrower);


router.post('/:accountId/deposit', passport.authenticate('jwt', { session: false }), Deposit);
router.post('/:accountId/withdraw', passport.authenticate('jwt', { session: false }), withDraw);
// router.post('/', passport.authenticate('jwt', { session: false }), borrowerController.createBorrower);
// router.put('/:id', passport.authenticate('jwt', { session: false }), borrowerController.updateBorrower);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), borrowerController.deleteBorrower);

module.exports = router;