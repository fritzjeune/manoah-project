import React, { useState, useEffect } from "react";

const LoanRegisterPage = () => {
    const [loanApplications, setLoanApplications] = useState([]);

    useEffect(() => {
        // Here you can implement the logic to fetch the loan applications data
        setLoanApplications([
            {
                id: 1,
                borrowerName: "Jane Doe",
                loanAmount: 5000,
                loanPurpose: "Education",
                applicationDate: "2023-03-08",
            },
            // More loan application data...
        ]);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-8">Loan Register</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Application ID</th>
                            <th className="px-4 py-2 border border-gray-300">Borrower Name</th>
                            <th className="px-4 py-2 border border-gray-300">Loan Amount</th>
                            <th className="px-4 py-2 border border-gray-300">Loan Purpose</th>
                            <th className="px-4 py-2 border border-gray-300">Application Date</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanApplications.map((application) => (
                            <tr key={application.id}>
                                <td className="px-4 py-2 border border-gray-300">{application.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{application.borrowerName}</td>
                                <td className="px-4 py-2 border border-gray-300">{application.loanAmount}</td>
                                <td className="px-4 py-2 border border-gray-300">{application.loanPurpose}</td>
                                <td className="px-4 py-2 border border-gray-300">{application.applicationDate}</td>
                                <td className="px-4 py-2 border border-gray-300 flex justify-center">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1">View</button>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded-md mx-1">Approve</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded-md mx-1">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanRegisterPage;