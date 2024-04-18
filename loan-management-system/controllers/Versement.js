// controllers/PaymentController.js
const {
    Versement,
    Loan,
    BorrowerAccount,
    VersementMetadata,
    AccountTransaction,
    User,
    PaymentMethod,
    Disbursement,
    ReferencePerson,
    LoanStatus,
    LoanPaymentFrequence,
    Borrower,
    Pledge
} = require('../config/sequelize');

// amount_approved, mortgage_length, interest_rate, approved_date

const createPayment = async (req, res) => {
    let passedPayment = req.body;
    const {borrowerId, loanId} = req.params
    console.log(req.params)
    try {
        // Check if the loan exists
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({
                message: 'Loan not found'
            });
        }
        passedPayment.loan_id = loanId

        // Create a payment for the loan
        const newPayment = await Payment.create(passedPayment);

        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const getPaymentsForLoan = async (req, res) => {
    const loanId = req.params.loanId;

    try {
        // Check if the loan exists
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({
                message: 'Loan not found'
            });
        }

        // Get all payments for the loan
        const payments = await Payment.findAll({
            where: {
                loan_id: loanId
            },
        });

        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const payVersement = async (req, res) => {
    try {
        const {loanId, versementId} = req.params
        // verify that the versement exist by its Id 
        if (!req.body.amount || !req.body.account_id) {
            return res.status(404).json({
                message: "Incorrect request, Infos missed!"
            })
        }

        const versement = await Versement.findOne({
            where: {
                versement_id: versementId,
                loan_id: loanId
            }
        })

        if (!versement) {
            return res.status(404).json({
                message: "Versement not found"
            })
        }

        if (versement.status_id == 4) {
            return res.status(404).json({
                message: "Versement already paid"
            })
        }

        const { amount, account_id } = req.body

        // Verify account number 
        const account = await BorrowerAccount.findByPk(account_id)

        if (!account || (account.account_status_id > 3)) {
            return res.status(403).json({
                message: "Account Number not eligible for payments"
            })
        }

        // Check the user doing the transaction
        const user = req.user.user_id

        let versementStatus = 4
        let amountConverted = parseFloat(amount)
        // Check the amount passed

        if (!amountConverted || amountConverted == 0) {
            return res.status(403).json({
                message: "Not enough funds!"
            })
        }

        if ( amountConverted < versement.grand_total ) {
            versementStatus = 3
        }

        // check if penalities are applied...
        if (versement.penalities > 0) {

        }

        // create a transaction in the borrower account 
        const deposit = await AccountTransaction.create({
            borrower_account_id: account.account_id,
            // amount: amountConverted >= versement.grand_total ? versement.grand_total - versement.penalities : amountConverted >= versement.versement_amount ? versement.versement_amount : amountConverted,
            amount: amountConverted >= versement.grand_total ? versement.grand_total : amountConverted,
            balance: account.balance,
            transaction_type_id: 3,
            created_by: user
        })

        // TODO: check if deposit passed

        if (amountConverted > versement.grand_total) {
            await AccountTransaction.create({
                borrower_account_id: account.account_id,
                amount: amountConverted - versement.grand_total ,
                balance: account.balance + (amountConverted - versement.grand_total),
                transaction_type_id: 1,
                created_by: user
            })
        }

        if (!deposit) {
            return res.status(500).json({
                message: "Transaction failed!"
            })
        }

        // create a payment metadata
        await VersementMetadata.create({
            created_by: user,
            amount: amountConverted,
            deposit_reference_id: deposit.transaction_id,
            versement_id: versement.versement_id
        })
        .then(async (verMTD) => {
            // mark the versement as paid
            await versement.update({
                status_id: amountConverted >= versement.grand_total ? 4 : 3,
                grand_total: versement.grand_total - deposit.amount
            })
            .then(async (vers) => {
                await Loan.findByPk(loanId, {
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
        .catch((err) => {
            if (err) {
                return res.status(500).json({
                    message: "Versement metadata not created",
                    error: err.message
                })
            }
        })

        // return the loan
    } catch (err) {
        return res.status(500).json({
            message: "Some server error occure while making the payment",
            error: err.message
        })
    }
}

const updatePayment = async (req, res) => {
    const paymentId = req.params.id;
    // const {borrowerid, loanId} = req.params
    const updatedPaymentData = req.body;

    try {
        // Check if the payment exists
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        // Update the payment
        await payment.update(updatedPaymentData);

        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const deletePayment = async (req, res) => {
    const paymentId = req.params.id;

    try {
        // Check if the payment exists
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        // Delete the payment
        await payment.destroy();

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// ... (Other functions)

module.exports = {
    createPayment,
    getPaymentsForLoan,
    updatePayment,
    deletePayment,
    payVersement
}