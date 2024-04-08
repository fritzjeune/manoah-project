// controllers/PaymentController.js
const {
    Versement,
    Loan
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
    deletePayment
}