// PaymentForm.js
import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSubmit }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [monthReference, setMonthReference] = useState('');

    const handlePaymentSubmit = () => {
        // Validation logic
        if (!date || !amount || !paymentMethod || !monthReference) {
            // Display an error message or handle validation as needed
            return;
        }

        // Submission logic
        const newPayment = {
            date,
            amount: parseFloat(amount),
            paymentMethod,
            monthReference,
        };

        // Pass the new payment to the parent component
        onPaymentSubmit(newPayment);

        // Clear the form after submission
        setDate('');
        setAmount('');
        setPaymentMethod('');
        setMonthReference('');
    };

    return (
        <div className="mx-auto min-w-[600px] my-[20px]">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600" >Record Payment</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date:</label>
                <input
                    defaultValue={new Date().toUTCString()}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter payment amount"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Payment Method:</label>
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter payment method"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Month Reference:</label>
                <input
                    type="text"
                    value={monthReference}
                    onChange={(e) => setMonthReference(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter month reference"
                />
            </div>
            <div className="flex items-center">
                <button
                    onClick={handlePaymentSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Record Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentForm;
