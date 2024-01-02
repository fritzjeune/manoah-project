import React, { useState, useEffect } from "react";

const LoanManagementPage = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        // Here you can implement the logic to fetch the loans data
        setLoans([
            {
                id: 1,
                borrowerName: "John Doe",
                loanAmount: 10000,
                interestRate: 5.5,
                repaymentSchedule: "Monthly",
            },
            // More loan data...
        ]);
    }, []);

    return (
        <div className="bg-gray-100 h-full">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">Loan Management</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-300">Loan ID</th>
                                <th className="px-4 py-2 border border-gray-300">Borrower Name</th>
                                <th className="px-4 py-2 border border-gray-300">Loan Amount</th>
                                <th className="px-4 py-2 border border-gray-300">Interest Rate</th>
                                <th className="px-4 py-2 border border-gray-300">Repayment Schedule</th>
                                <th className="px-4 py-2 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} className="border-b border-gray-300">
                                    <td className="px-4 py-2 border border-gray-300">{loan.id}</td>
                                    <td className="px-4 py-2 border border-gray-300">{loan.borrowerName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{loan.loanAmount}</td>
                                    <td className="px-4 py-2 border border-gray-300">{loan.interestRate}</td>
                                    <td className="px-4 py-2 border border-gray-300">{loan.repaymentSchedule}</td>
                                    <td className="px-4 py-2 border border-gray-300 flex justify-center">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1">View</button>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded-md mx-1">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md mx-1">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoanManagementPage;