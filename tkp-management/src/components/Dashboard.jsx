import React, { useState, useEffect } from "react";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        // Here you can implement the logic to fetch the dashboard data
        setDashboardData({
            totalLoans: 100,
            activeLoans: 75,
            completedLoans: 25,
            totalLoanAmount: 1000000,
            totalRepaidAmount: 750000,
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-8">Dashboard Summary</h1>
                <ul className="grid grid-cols-2 gap-4">
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-blue-500 text-white">
                        <span>Total Loans:</span>
                        <span>{dashboardData.totalLoans}</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-green-500 text-white">
                        <span>Active Loans:</span>
                        <span>{dashboardData.activeLoans}</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-red-500 text-white">
                        <span>Completed Loans:</span>
                        <span>{dashboardData.completedLoans}</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-yellow-500 text-white">
                        <span>Total Loan Amount:</span>
                        <span>{dashboardData.totalLoanAmount}</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-purple-500 text-white">
                        <span>Total Repaid Amount:</span>
                        <span>{dashboardData.totalRepaidAmount}</span>
                    </li>
                </ul>
                {/* Additional widgets and charts can be added here */}
            </div>
        </div>
    );
};

export default Dashboard;