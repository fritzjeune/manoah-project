// LoanPreviewCard.js
import React, { useState } from 'react';
import PaymentModal from './PaymentModal';

const LoanPreviewCard = ({ loanDetails }) => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handlePaymentSubmit = (payment) => {
        // Handle payment submission logic here
        console.log('Payment submitted:', payment);

        // Close the PaymentModal after submission
        setIsPaymentModalOpen(false);
    };

    return (
        <div className="bg-white w-full rounded-md shadow-md p-[20px] max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
            <div className="mb-2">
                <p className="mb-2"><strong>Amount Requested:</strong> ${loanDetails.amountRequested}</p>
                <p className="mb-2"><strong>Interest Rate:</strong> {loanDetails.interestRate}%</p>
                <p className="mb-2"><strong>Mortgage Length:</strong> {loanDetails.mortgageLength} months</p>
                <p className="mb-2"><strong>Reason for Loan:</strong> {loanDetails.reasonForLoan}</p>
                <p className="mb-2"><strong>Approval Date:</strong> {loanDetails.approvalDate}</p>
                <p className="mb-2"><strong>Payment End Date:</strong> {loanDetails.paymentEndDate}</p>
                {/* Add more details as needed */}
            </div>
            <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                >
                Record Payment
            </button>

            {/* PaymentModal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onRequestClose={() => setIsPaymentModalOpen(false)}
                onPaymentSubmit={handlePaymentSubmit}
            />
        </div>
    );
};

export default LoanPreviewCard;
