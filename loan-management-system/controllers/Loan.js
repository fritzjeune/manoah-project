const {sequelize, Loan, LoanStatus, Borrower, Pledge, ReferencePerson, LoanPaymentFrequence, VersementMetadata, Versement, VersementStatus, BorrowerAccount} = require('../config/sequelize');
const { Op } = require('sequelize');
const { getListDateFromRange } = require('../middlewares/date');


const getAllLoansForBorrower = async (req, res) => {
    const { borrowerId } = req.params
    try {
        const loans = await Loan.findAll({
            where: {
                borrower_id: borrowerId
            },
            include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, { model: Versement, include: [{ model: VersementMetadata }]}]
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
            include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, {model: LoanStatus}, {model: LoanPaymentFrequence}, { model: Versement, include: [{ model: VersementMetadata }]}]
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
            include: [{model: Pledge},  {model: Borrower}, {model: ReferencePerson}, { model: Versement, order: [
                ['versement_id', 'DESC'],
            ], include: [{ model: VersementMetadata }]}]
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

const approuveLoan = async (req, res) => {
    const { loanId } = req.params;
    let totalInt = 0
    let totalLoan = 0
    const calculateInterest = (appr_amount, int_rate, mort_length) => {
        return (appr_amount * (int_rate/100) * mort_length)
    }

    const generateLoanDetails = (appr_date, mort_length, appr_amount, pay_fre, int_rate) => {
        let loanPaymentsDetails = []
        if (appr_date && mort_length && appr_date) {
            let amortDates = []
            if (pay_fre == 2) {
                amortDates = getListDateFromRange(appr_date, mort_length, "w")
            } else if (pay_fre == 3) {
                amortDates = getListDateFromRange(appr_date, mort_length, "b")
            } else {
                amortDates = getListDateFromRange(appr_date, mort_length, "m")
            }
            
            totalInt = calculateInterest(appr_amount, int_rate, mort_length)
            totalLoan = appr_amount + totalInt
            const monthlyPayment = totalLoan / mort_length
            const monthlyInterest = totalInt / mort_length
            const monthlyCapital = appr_amount / mort_length
            let subTotal = (totalLoan - monthlyPayment)

            let balanceInterest = totalInt
            let balanceCapital = appr_amount

            amortDates.map((amrt, i) => {
                loanPaymentsDetails.push({
                    versement_date: amrt,
                    versement_amount: Math.round(monthlyPayment, 2),
                    capital: Math.round(monthlyCapital),
                    interest: Math.round(monthlyInterest),
                    penalities: 0.00,
                    balance_capital: Math.round(balanceCapital),
                    balance_interest: Math.round(balanceInterest),
                    grand_total: Math.round(monthlyPayment),
                })
                balanceInterest -= monthlyInterest
                balanceCapital -= monthlyCapital
                subTotal = (subTotal - monthlyPayment)
            })
        }
        console.table(loanPaymentsDetails)
        return loanPaymentsDetails
    }

    try {
        let loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({
                message: "Loan not found!"
            })
        }
        // TODO: Check if loan is not already approuved?
        if (!loan.loan_status_id > 1) {
            return res.status(400).json({
                message: "Loan already approuved!"
            })
        }

        if (!req.body) {
            return res.status(400).json({
                message: "No data passed!"
            })
        }

        // TODO: check if no irregulated loan exist in the borrower account
        const loans = await Loan.findAll({
            where: {
                borrower_id: loan.borrower_id
            }
        });

        const ids = [2, 3, 4, 5, 7]

        const irrLoan = loans.filter((curLoan) => ids.includes(curLoan.loan_status_id) )

        if (irrLoan.length > 0) {
            return res.status(401).json({
                message: "You are not eligible for a new Loan!"
            })
        }

        const {amount_approuved, interest_rate, mortgage_length, status_id, approval_date, payment_frequence_id} = req.body

        const verms = generateLoanDetails(approval_date, mortgage_length, amount_approuved, payment_frequence_id, interest_rate)

        if (verms.length > 0) {
            Promise.all(
                verms.map(async verse => {
                    verse.loan_id = loanId
                    verse.status_id = 1
                    await Versement.create(verse)
                })
            ).then(async () => {
                console.log(req.body)
                req.body.total_interest = totalInt
                req.body.total_loan = totalLoan
                console.log(req.body)
                await loan.update(req.body, {
                    where: {loan_id: loanId},
                    returning: true,
                    include: [{model: Pledge},  {model: Borrower}, {model: ReferencePerson}, { model: Versement, order: [
                        // ['id', 'DESC'],
                        ['versement_date', 'ASC'],
                    ], include: [{ model: VersementMetadata }, {model: VersementStatus}]}]
                }).then(async (loan) => {
                    await BorrowerAccount.findOne({account_number: req.body.account_number})
                    .then((account) => {
                        account.update({minimum_balance: account.minimum_balance + (loan.amount_approuved * (20/100))})
                        .then(() => res.status(201).json(loan))
                    })
                    .catch((err) => console.log(err))
                })
                // loan = await Loan.findByPk(loanId) 
            }).catch((err)=> {
                // TODO: removing all added versement for data integrity
                return res.status(500).json({
                    message: "Error approuving the Loan"
                }) 
            })
        }
        
    } catch (err) {
        if (err) console.log(err)
    }
}

const deniedLoan = async (req, res) => {
    try {
        const { loanId } = req.params;
        let loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({
                message: "Loan not found!"
            })
        }
        // TODO: Check if loan is not already approuved?
        if (!loan.loan_status_id > 1) {
            return res.status(400).json({
                message: "Loan already been approuved!"
            })
        }

        loan.update({loan_status_id: 7})
        .then((loan) => res.status(201).json(loan))
        .catch((err) => {
            return res.status(500).json({
                message: "Loan not updated!",
                error: err.message
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Loan not updated!",
            error: err.message
        })
    }
}

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
    approuveLoan,
    deniedLoan
    // Add other controller methods as needed
};
