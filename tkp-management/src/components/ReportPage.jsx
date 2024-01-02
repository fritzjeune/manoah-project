import React, { useState, useEffect } from "react";

const ReportPage = () => {
    const [reportData, setReportData] = useState({});

    useEffect(() => {
        // Here you can implement the logic to fetch the report data
        setReportData({
            delinquencyRate: 5.2,
            ltvRatio: 75.3,
            lossRate: 1.8,
            averageDaysToPay: 15,
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-8">Loan Performance at a Glance</h1>
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-blue-500 text-white">
                        <span>Delinquency Rate:</span>
                        <span>{reportData.delinquencyRate}%</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-green-500 text-white">
                        <span>Loan-to-Value (LTV) Ratio:</span>
                        <span>{reportData.ltvRatio}%</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-red-500 text-white">
                        <span>Loss Rate:</span>
                        <span>{reportData.lossRate}%</span>
                    </li>
                    <li className="flex items-center justify-between px-4 py-2 rounded-lg bg-yellow-500 text-white">
                        <span>Average Days to Pay:</span>
                        <span>{reportData.averageDaysToPay} days</span>
                    </li>
                </ul>
                {/* Additional charts and graphs can be added here */}
            </div>
        </div>
    );
};

export default ReportPage;