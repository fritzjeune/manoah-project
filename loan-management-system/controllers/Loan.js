const {sequelize, Loan, LoanStatus, Borrower, Pledge, Payment, PaymentMethod, ReferencePerson, LoanPaymentFrequence} = require('../config/sequelize');
const { Op } = require('sequelize');


const getAllLoansForBorrower = async (req, res) => {
    const { borrowerId } = req.params
    try {
        const loans = await Loan.findAll({
            where: {
                borrower_id: borrowerId
            },
            include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, { model: Payment, include: [{ model: PaymentMethod }]}]
        });
        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            // TODO: readd where clause base on request queries
            // where: {
            //     borrower_id: borrowerId
            // },
            include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, {model: LoanStatus}, {model: LoanPaymentFrequence}, { model: Payment, include: [{ model: PaymentMethod }]}]
        });
        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLoanById = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await Loan.findByPk(loanId, {
            include: [{model: Pledge},  {model: Borrower}, {model: ReferencePerson}, { model: Payment, include: [{ model: PaymentMethod }]}]
        });
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLoansByApprovalDate = async (req, res) => {
    try {
        let today = new Date();
        // TODO: costum error handler
        if (req.query.date) {
            today = new Date(req.query.date)
        }
        const todayMonth = today.getMonth() + 1; // Adding 1 because months are zero-indexed
        const todayDay = today.getDate();

        const loans = await Loan.findAll({
            where: {
                approval_date: {
                    [Op.and]: [
                        sequelize.where(
                            sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "approval_date"')),
                            todayMonth
                        ),
                        sequelize.where(
                            sequelize.fn('EXTRACT', sequelize.literal('DAY FROM "approval_date"')),
                            todayDay
                        ),
                    ],
                },
            },
            include: [
                {
                    model: LoanStatus,
                    where: {
                        id: {
                            [Op.ne]: 1,
                        },
                    },
                },
            ],
        });

        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createLoan = async (req, res) => {
    const { borrowerId } = req.params; // Extract borrowerId from req.params
    const loanData = req.body;
    
    try {
        // Check if the borrower exists
        const borrower = await Borrower.findByPk(borrowerId);
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
        loanData.borrower_id = borrower.toJSON().borrower_id
        // Create the loan and associate it with the borrower
        const newLoan = await Loan.create(loanData);
        await borrower.addLoan(newLoan);
        res.status(201).json(newLoan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateLoan = async (req, res) => {
    const { loanId } = req.params;
    const updatedLoanData = req.body;
    try {
        const existingLoan = await Loan.findByPk(loanId);
        if (!existingLoan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        await existingLoan.update(updatedLoanData);

        res.status(200).json(existingLoan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteLoan = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        await loan.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add other loan-related controller methods as needed

module.exports = {
    getAllLoans,
    getAllLoansForBorrower,
    getLoanById,
    getLoansByApprovalDate,
    createLoan,
    updateLoan,
    deleteLoan,
    // Add other controller methods as needed
};
