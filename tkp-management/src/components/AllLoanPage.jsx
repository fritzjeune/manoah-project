
import React, { useState, useEffect } from "react";

const AllLoanPage = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        // Here you can implement the logic to fetch all loans data
        setLoans([
            {
                id: 1,
                borrowerName: "John Smith",
                loanAmount: 10000,
                interestRate: 5.5,
                repaymentSchedule: "Monthly",
                status: "Active",
            },
            // More loan data...
        ]);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-8">All Loans</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Loan ID</th>
                            <th className="px-4 py-2 border border-gray-300">Borrower Name</th>
                            <th className="px-4 py-2 border border-gray-300">Loan Amount</th>
                            <th className="px-4 py-2 border border-gray-300">Interest Rate</th>
                            <th className="px-4 py-2 border border-gray-300">Repayment Schedule</th>
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td className="px-4 py-2 border border-gray-300">{loan.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{loan.borrowerName}</td>
                                <td className="px-4 py-2 border border-gray-300">{loan.loanAmount}</td>
                                <td className="px-4 py-2 border border-gray-300">{loan.interestRate}</td>
                                <td className="px-4 py-2 border border-gray-300">{loan.repaymentSchedule}</td>
                                <td className="px-4 py-2 border border-gray-300">{loan.status}</td>
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
    );
};

export default AllLoanPage;