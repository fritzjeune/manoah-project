const {sequelize, Loan, LoanStatus, Borrower, Pledge, ReferencePerson, LoanPaymentFrequence, VersementMetadata, Versement, VersementStatus, BorrowerAccount, PenalityReport, Disbursement, PaymentMethod, User} = require('../config/sequelize');
const { Op } = require('sequelize');
const { getListDateFromRange, generateCaseNumber, formatDate } = require('../middlewares/date');
const penalityFee = 100

const getAllLoansForBorrower = async (req, res) => {
    const { borrowerId } = req.params
    try {
        const loans = await Loan.findAll({
            where: {
                borrower_id: borrowerId
            },
            include: [
                {model: Pledge}, 
                {model: Borrower},
                {
                    model: Disbursement, 
                    include: [
                        {model: PaymentMethod}, 
                        {model: User}
                    ]
                }, 
                {model: ReferencePerson}, 
                {model: LoanStatus}, 
                {model: LoanPaymentFrequence}, 
                { 
                    model: Versement, 
                    include: [{ model: VersementMetadata }]
                }
            ],
            order: [[{ model: Versement }, 'versement_date', 'ASC']],
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
            include: [
                {model: Pledge}, 
                {model: Borrower},
                {
                    model: Disbursement, 
                    include: [
                        {model: PaymentMethod}, 
                        {model: User}
                    ]
                }, 
                {model: ReferencePerson}, 
                {model: LoanStatus}, 
                {model: LoanPaymentFrequence}, 
                { 
                    model: Versement, 
                    include: [{ model: VersementMetadata }]
                }
            ],
            order: [[{ model: Versement }, 'versement_date', 'ASC']],
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
            include: [
                { model: Pledge },
                { 
                    model: Borrower,
                    include: [{model: BorrowerAccount}]
                },
                { model: ReferencePerson },
                { model: LoanStatus },
                {
                    model: Disbursement, 
                    include: [
                        {model: PaymentMethod}, 
                        {model: User}
                    ]
                },
                {
                    model: Versement,
                    include: [
                        { model: VersementMetadata },
                        { model: VersementStatus }
                    ],
                },
            ],
            order: [[{ model: Versement }, 'versement_date', 'ASC']],
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

// TODO: separate approuve loan to disbursement 
const approuveLoan = async (req, res) => {
    const { loanId } = req.params;
    console.log(req.body)
    try {
        let loan = await Loan.findByPk(loanId, {
            include: [{model: ReferencePerson}]
        });

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found!"
            })
        }
        //  Check if loan is not already approuved?
        if (loan.loan_status_id > 1) {
            return res.status(400).json({
                message: "Loan decision already posted!"
            })
        }

        //  Check if the status is passed
        if (!req.body.loan_status_id) {
            return res.status(400).json({
                message: "Status not been passed"
            })
        }

        if (loan.reference_people?.length < 2) {
            return res.status(404).json({
                message: "Loan must have 2 reference persons!"
            })
        }

        if (!req.body) {
            return res.status(400).json({
                message: "No data passed!"
            })
        }

        // check if no irregulated loan exist in the borrower account
        const loans = await Loan.findAll({
            where: {
                borrower_id: loan.borrower_id,
                loan_status_id: {
                    [Op.in] : [2, 3, 4, 5, 7]
                },
            },
        });

        // console.log(loans)

        // const ids = [2, 3, 4, 5, 7]

        // const irrLoan = loans.filter((curLoan) => ids.includes(curLoan.loan_status_id) )

        if (loans.length > 0) {
            return res.status(401).json({
                message: "You are not eligible for a new Loan!"
            })
        }

        await loan.update(req.body)
        .then(async (loan) => {
            await Loan.findByPk(loan.loan_id, {
                include: [
                    {model: Pledge}, 
                    {model: Borrower},
                    {
                        model: Disbursement, 
                        include: [
                            {model: PaymentMethod}, 
                            {model: User}
                        ]
                    }, 
                    {model: ReferencePerson}, 
                    {model: LoanStatus}, 
                    {model: LoanPaymentFrequence}, 
                    { 
                        model: Versement, 
                        include: [{ model: VersementMetadata }]
                    }
                ],
            }).then((loan) => res.status(201).json(loan))
        })
        
    } catch (err) {
        if (err) {
            return res.status(500).json({
                message: "Error approuving the Loan",
                error: err.message
            }) 
        }
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
        // Check if loan is not already approuved?
        if (!loan.loan_status_id > 1) {
            return res.status(400).json({
                message: "Loan already been approuved!"
            })
        }

        loan.update({loan_status_id: 7, memo: req.body?.memo})
        .then(async (loan) => {
            await Loan.findByPk(loan.loan_id, {
                include: [
                    {model: Pledge}, 
                    {model: Borrower},
                    {
                        model: Disbursement, 
                        include: [
                            {model: PaymentMethod}, 
                            {model: User}
                        ]
                    }, 
                    {model: ReferencePerson}, 
                    {model: LoanStatus}, 
                    {model: LoanPaymentFrequence}, 
                    { 
                        model: Versement, 
                        include: [{ model: VersementMetadata }]
                    }
                ],
            }).then((loan) => res.status(201).json(loan))
        })
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

const disburseLoan = async (req, res) => {
    const { loanId } = req.params;

    let loan = await Loan.findByPk(loanId);
    if (!loan) {
        return res.status(404).json({
            message: "Loan not found!"
        })
    }

    // Check if loan is not already approuved?
    if (!loan.loan_status_id == 2) {
        return res.status(400).json({
            message: "Loan already loan not approuved or disbursed yet!"
        })
    }

    const { amount_approuved, interest_rate, mortgage_length, approval_date, payment_frequence_id } = loan

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
        // const { amount_approuved, interest_rate, mortgage_length, approval_date, payment_frequence_id } = req.body
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
                        .then(async () => {
                            await Loan.findByPk(loan.loan_id, {
                                include: [
                                    {model: Pledge}, 
                                    {model: Borrower},
                                    {
                                        model: Disbursement, 
                                        include: [
                                            {model: PaymentMethod}, 
                                            {model: User}
                                        ]
                                    }, 
                                    {model: ReferencePerson}, 
                                    {model: LoanStatus}, 
                                    {model: LoanPaymentFrequence}, 
                                    { 
                                        model: Versement, 
                                        include: [{ model: VersementMetadata }]
                                    }
                                ],
                                order: [[{ model: Versement }, 'versement_date', 'ASC']],
                            }).then((loan) => res.status(201).json(loan))
                        })
                    })
                    .catch((err) => console.log(err))
                })
                // loan = await Loan.findByPk(loanId) 
            }).catch((err)=> {
                // TODO: removing all added versement for data integrity
                return res.status(500).json({
                    message: "Error disbursing the Loan",
                    error: err.message
                }) 
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error disbursing the Loan",
            error: error.message
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
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
        await Loan.create(loanData)
        .then((loan) => {
            let l = borrower.last_name[0]
            let f = borrower.first_name[0]
            const loanCaseNumber = `TKP-${l}${f}-${generateCaseNumber(loan.loan_id)}`
            loan.update({loan_number: loanCaseNumber})
            .then(async (loan) => {
                await Loan.findByPk(loan.loan_id, {
                    include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, {model: LoanStatus}, {model: LoanPaymentFrequence}, { model: Versement, include: [{ model: VersementMetadata }]}]
                }).then((loan) => res.status(201).json(loan))
            })
        })
        // await borrower.addLoan(newLoan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateLoan = async (req, res) => {
    const { loanId } = req.params;
    const updatedLoanData = req.body;
    try {
        const existingLoan = await Loan.findByPk(loanId);
        if (!existingLoan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        if (existingLoan.loan_status_id >= 2) {
            return res.status(404).json({ message: 'Loan details cannot be changed after approval!' });
        }

        await existingLoan.update(updatedLoanData)
        .then(async (loan) => {
            await Loan.findByPk(loan.loan_id, {
                include: [{model: Pledge}, {model: Borrower}, {model: ReferencePerson}, {model: LoanStatus}, {model: LoanPaymentFrequence}, { model: Versement, include: [{ model: VersementMetadata }]}]
            }).then((loan) => res.status(201).json(loan))
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const deleteLoan = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        if (!loan.loan_status_id > 2) {
            return res.status(400).json({ message: 'Loan cannot be deleted after approval!' });
        }

        await loan.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const checkLoanIrregulations = async (req, res) => {
    try {
        // const yesterday = new Date();
        // yesterday.setDate(yesterday.getDate() - 1);
        const versements = await Versement.update({
            penalities: sequelize.literal(`penalities + ${penalityFee}`),
            grand_total: sequelize.literal(`grand_total + ${penalityFee}`)
        },{
            where: {
                versement_date: {
                    [Op.lt]: formatDate(new Date(Date.now() - (60 * 60 * 1000))),
                },
                status_id: 1
            },
            returning: true
        })
        .then(async ([count, rowsUpdated]) => {
            let total_penalities = 0;
            let today_fee_amount = 0;
            let total_charged = count;
            rowsUpdated.forEach(row => {
                total_penalities += row.penalities;
                today_fee_amount += 100
            })
            await PenalityReport.create({
                total_charged,
                today_fee_amount,
                total_penalities
            }).then((reports) => console.table(reports.toJSON()))
        });
        // res.status(201).json(versements)
    } catch (error) {
        console.log(error)
    } 
}

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
    disburseLoan,
    deniedLoan,
    checkLoanIrregulations
    // Add other controller methods as needed
};
