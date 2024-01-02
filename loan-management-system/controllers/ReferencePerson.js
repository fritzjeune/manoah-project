// controllers/ReferencePerson.js

const {
    ReferencePerson,
    Borrower,
    Loan
} = require('../config/sequelize'); // Adjust the import based on your project structure

const addReferencePerson = async (req, res) => {
    try {
        const {
            borrowerId,
            loanId
        } = req.params;
        const refPerson = req.body;

        // Check if the borrower exists
        const borrower = await Borrower.findByPk(borrowerId);
        if (!borrower) {
            return res.status(404).json({
                message: 'Borrower not found'
            });
        }

        // Check if the loan exists and belongs to the borrower
        const loan = await Loan.findOne({
            where: {
                loan_id: loanId,
                borrower_id: borrowerId
            },
        });
        if (!loan) {
            return res.status(404).json({
                message: 'Loan not found or does not belong to the borrower'
            });
        }

        // Create the reference person
        const referencePerson = await ReferencePerson.create({
            ...refPerson,
            borrower_id: borrowerId,
            loan_id: loanId,
        });

        res.status(201).json(referencePerson);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const updateReferencePerson = async (req, res) => {
    try {
        const {
            borrowerId,
            loanId,
            id
        } = req.params;
        const refPerson = req.body;

        // Check if the reference person exists
        const referencePerson = await ReferencePerson.findOne({
            where: {
                reference_id: id,
                borrower_id: borrowerId,
                loan_id: loanId
            },
        });
        if (!referencePerson) {
            return res.status(404).json({
                message: 'Reference person not found or does not belong to the borrower and loan'
            });
        }

        // Update the reference person
        await referencePerson.update(refPerson);

        res.status(200).json(referencePerson);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const deleteReferencePerson = async (req, res) => {
    try {
        const {
            borrowerId,
            loanId,
            id
        } = req.params;

        // Check if the reference person exists
        const referencePerson = await ReferencePerson.findOne({
            where: {
                reference_id: id,
                borrower_id: borrowerId,
                loan_id: loanId
            },
        });
        if (!referencePerson) {
            return res.status(404).json({
                message: 'Reference person not found or does not belong to the borrower and loan'
            });
        }

        // Delete the reference person
        await referencePerson.destroy();

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const getAllReferencePersons = async (req, res) => {
    try {
        const {
            borrowerId,
            loanId
        } = req.params;

        // Check if the loan exists and belongs to the borrower
        const loan = await Loan.findOne({
            where: {
                loan_id: loanId,
                borrower_id: borrowerId
            },
        });
        if (!loan) {
            return res.status(404).json({
                message: 'Loan not found or does not belong to the borrower'
            });
        }

        // Get all reference persons for the loan
        const referencePersons = await ReferencePerson.findAll({
            where: {
                borrower_id: borrowerId,
                loan_id: loanId
            },
        });

        res.status(200).json(referencePersons);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const getReferencePersonById = async (req, res) => {
    try {
        const {
            borrowerId,
            loanId,
            id
        } = req.params;

        // Check if the reference person exists
        const referencePerson = await ReferencePerson.findOne({
            where: {
                reference_id: id,
                borrower_id: borrowerId,
                loan_id: loanId
            },
        });
        if (!referencePerson) {
            return res.status(404).json({
                message: 'Reference person not found or does not belong to the borrower and loan'
            });
        }

        res.status(200).json(referencePerson);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports = {
    addReferencePerson,
    updateReferencePerson,
    deleteReferencePerson,
    getAllReferencePersons,
    getReferencePersonById,
};