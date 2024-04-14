// controllers/ReferencePerson.js

const { Op } = require('sequelize');
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

        const refAntecedant = await Loan.findAll({
            include: [ 
                {
                    model: Borrower,
                    include: [
                        {
                            model: Loan,
                            attributes: ['loan_status_id'],
                            where: {
                                loan_status_id: {
                                    [Op.in]: [2, 3, 4, 5]
                                }
                            },
                        }
                    ],
                    attributes: ['nif', 'ninu'],
                    where: {
                        [Op.or] : [
                            { nif: refPerson.nif },
                            { ninu: refPerson.nif }
                        ]
                    }, 
                },
                {
                    model: ReferencePerson,
                    attributes: ['nif', 'last_name', 'first_name'],
                    where: {
                        nif: refPerson.nif 
                    },
                },
            ],
            where: {
                loan_status_id: {
                    [Op.in]: [2, 3, 4, 5, 7]
                }
            },
        })

        if (refAntecedant.length > 0) {
            return res.status(403).json({
                message: 'This Person is not Eligible!'
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
            message: 'Internal Server Error',
            error: error.message
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

const getAllReferencePersonsByLoan = async (req, res) => {
    try {
        const {
            loanId
        } = req.params;

        // Check if the loan exists and belongs to the borrower
        const loan = await Loan.findOne({
            where: {
                loan_id: loanId,
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
            // borrowerId,
            loanId,
            id
        } = req.params;

        // Check if the reference person exists
        const referencePerson = await ReferencePerson.findOne({
            where: {
                reference_id: id,
                // borrower_id: borrowerId,
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
    getAllReferencePersonsByLoan
};