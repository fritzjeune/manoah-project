// LoanModal.js
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import LoanModalActions from './LoanMorgageActions';
import { getListDateFromRange } from '../functions/date';


const LoanModal = ({ isOpen, onRequestClose, onLoanSubmit }) => {
    const [interestMethod, setInterestMethod] = useState([
        {
            name: "Annually",
            value: 4
        },
        {
            name: "Monthly",
            value: 3
        },
        {
            name: "Weekly",
            value: 2
        },
        {
            name: "Daily",
            value: 1
        },
    ])
    const [loanPaymentFrequence, setLoanPaymentFrequence] = useState([
        {
            name: "Monthly",
            value: 3
        },
        {
            name: "Weekly",
            value: 2
        },
        {
            name: "Daily",
            value: 1
        },
    ])
    const [amountRequested, setAmountRequested] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [mortgageLength, setMortgageLength] = useState('');
    const [reason, setReason] = useState('');
    const [approvalDate, setApprovalDate] = useState('');
    const [loanDetails, setLoanDetails] = useState({
        borrower_id: 30,
        amount_requested: 0,
        amount_approuved: 0,
        payment_frequence: 2,
        interest_rate: 2.10,
        mortgage_length: 24,
        reason: "Achat de voiture.",
        approval_date: "2023-12-26T05:00:00.000Z",
        total_interest: 111.00,
        total_loan: 1111.00,
        payment_end_date: "2023-12-26T05:00:00.000Z",
        loan_payment_frequence: 2,
        loan_status: 1
    });
    const [showMortgageTable, setShowMortgageTable] = useState(false);


    const generateLoanDetails = () => {
        let loanPaymentsDetails = []
        if (loanDetails.approval_date && loanDetails.mortgage_length) {
            const amortDates = getListDateFromRange(loanDetails.approval_date, loanDetails.mortgage_length)
            const monthlyPayment = loanDetails.total_loan / loanDetails.mortgage_length
            const monthlyInterest = loanDetails.total_interest / loanDetails.mortgage_length
            const monthlyCapital = loanDetails.amount_requested / loanDetails.mortgage_length
            let subTotal = (loanDetails.total_loan - monthlyPayment).toFixed(2)


            amortDates.map((amrt, i) => {
                loanPaymentsDetails.push({
                    month: i + 1,
                    date: amrt,
                    principal: monthlyCapital.toFixed(2),
                    interest: monthlyInterest.toFixed(2),
                    payment: monthlyPayment.toFixed(2),
                    subTotal: subTotal
                })
                subTotal = (subTotal - monthlyPayment).toFixed(2)
            })
        }
        return loanPaymentsDetails
    }

    useEffect(() => {
        // Update totalInterest and totalLoan whenever form fields change
        console.log(loanDetails)
        const { amountRequested, interestRate, mortgageLength } = loanDetails;
        const totalInterest = (amountRequested * interestRate * mortgageLength) / 1200 || 0;
        const totalLoan = amountRequested + totalInterest || 0;

        setLoanDetails((prevLoanDetails) => ({
            ...prevLoanDetails,
            totalInterest,
            totalLoan,
        }));
    }, [loanDetails.amount_requested, loanDetails.interest_rate, loanDetails.mortgage_length, loanDetails.approval_date, loanDetails.interest_method]);

    const handleLoanSubmit = async () => {
        // Validation logic
        if (!amountRequested || !interestRate || !mortgageLength || !reason || !approvalDate) {
            // Display an error message or handle validation as needed
            return false;
        }

        // Submission logic
        const newLoan = {
            amountRequested: parseFloat(amountRequested),
            interestRate: parseFloat(interestRate),
            mortgageLength: parseInt(mortgageLength),
            reason,
            approvalDate,
            totalInterest: loanDetails.total_interest,
            totalLoan: loanDetails.total_loan,
            // Add more loan details as needed
        };

        // Assuming onLoanSubmit returns a promise indicating success
        try {
            await onLoanSubmit(newLoan);
            // setShowMortgageTable(true); // Show mortgage table after successful submission
            return true; // Submission successful
        } catch (error) {
            // Handle submission error, display error message, etc.
            return false;
        }
    };

    // Function to calculate the payment end date based on approval date and mortgage length
    const calculatePaymentEndDate = (approvalDate, mortgageLength) => {
        const endDate = new Date(approvalDate);
        endDate.setMonth(endDate.getMonth() + parseInt(mortgageLength));
        return endDate.toISOString().split('T')[0];
    };

    const tableRef = useRef()
    const modalContentRef = useRef();
        // Function to generate mortgage details and return a table
    const GenerateMortgageTable = () => {

        return (
            <table className="w-full border-collapse border border-gray-300" id="mortgageTable" ref={tableRef}>
                <thead style={{position: 'sticky'}}>
                    <tr>
                        <th className="border border-gray-300 p-2">Month</th>
                        <th className="border border-gray-300 p-2">Payment Date</th>
                        <th className="border border-gray-300 p-2">Principal</th>
                        <th className="border border-gray-300 p-2">Interest</th>
                        <th className="border border-gray-300 p-2">Total Payment</th>
                        <th className="border border-gray-300 p-2">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {generateLoanDetails()?.map((row) => (
                        <tr key={row.month}>
                            <td className="border border-gray-300 p-2">{row.month}</td>
                            <td className="border border-gray-300 p-2">{row.date}</td>
                            <td className="border border-gray-300 p-2">{row.principal}</td>
                            <td className="border border-gray-300 p-2">{row.interest}</td>
                            <td className="border border-gray-300 p-2">{row.payment}</td>
                            <td className="border border-gray-300 p-2">{row.subTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 bg-blue-100 backdrop-sepia-0 bg-blue-200/80"
            shouldCloseOnOverlayClick={false}
            // portalClassName="opacity-100"
            transparent={true}
            // bodyOpenClassName=" opacity-100"  
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md "
        >
            <div className=' opacity-100'>
                <h2 className="text-2xl font-semibold mb-4">Add New Loan</h2>
                <div className="flex flex-wrap items-center" ref={modalContentRef}>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Amount Requested:</label>
                        <input
                            type="number"
                            value={loanDetails.amountRequested}
                            onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                amountRequested: parseFloat(e.target.value)
                            }))}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter amount requested"
                        />  
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Interest Method:</label>
                        <select name="" id="" defaultValue={loanDetails.interestMethod} className=' mt-1 p-2 w-full border rounded-md' onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                interestMethod: parseFloat(e.target.value)
                            }))}>
                            {interestMethod.map((method, id) => (
                                <option id={id} value={method.value}>{method.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Interest Method:</label>
                        <select name="" id="" defaultValue={loanDetails.loan_payment_frequence} className=' mt-1 p-2 w-full border rounded-md' onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                loan_payment_frequence: parseFloat(e.target.value)
                            }))}>
                            {loanPaymentFrequence.map((frequence, id) => (
                                <option id={id} value={frequence.value}>{frequence.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Interest Rate:</label>
                        <input
                            type="number"
                            value={loanDetails.interestRate}
                            onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                interestRate: parseFloat(e.target.value)
                            }))}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter interest rate"
                        />
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Mortgage Length (months):</label>
                        <input
                            type="number"
                            value={loanDetails.mortgageLength}
                            onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                mortgageLength: parseFloat(e.target.value)
                            }))}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter mortgage length"
                        />
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Reason for the Loan:</label>
                        <input
                            type="text"
                            value={loanDetails.reason}
                            onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                reason: e.target.value
                            }))}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter reason for the loan"
                        />
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
                        <label className="block text-sm font-medium text-gray-700">Approval Date:</label>
                        <input
                            type="date"
                            value={loanDetails.approvalDate}
                            onChange={(e) => setLoanDetails((prevLoanDetails) => ({
                                ...prevLoanDetails,
                                approvalDate: e.target.value
                            }))}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
                    <label className="block text-sm font-medium text-gray-700">Total Interest:</label>
                        <input
                            type="text"
                            value={loanDetails.totalInterest.toFixed(2)}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="flex-grow w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
                    <label className="block text-sm font-medium text-gray-700 mt-2">Total Loan:</label>
                        <input
                            type="text"
                            value={loanDetails.totalLoan.toFixed(2)}
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="flex-grow w-full mt-[20px]">
                        <button
                            onClick={handleLoanSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Add Loan
                        </button>
                        <button
                            onClick={() => setShowMortgageTable(true)}
                            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                        >
                            Generate Loan Details
                        </button>
                        <LoanModalActions generateMortgageTable={GenerateMortgageTable} referTo={modalContentRef} />
                    </div>
                    <div className=' overflow-y-scroll h-[500px] w-full mt-[20px]' id='mortgage-container'>
                        {showMortgageTable && <GenerateMortgageTable />}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoanModal;


// pledges: [
//     {
//         pledge_id: 3,
//         pledge_value: "12000.00",
//         location: "Eau chaude",
//         pledge_text: "An House",
//         loan_id: 4,
//         note: "au nom de Bamboch",
//         pledge_status_id: 1,
//         createdAt: "2024-01-01T19:44:45.000Z",
//         updatedAt: "2024-01-01T19:44:45.000Z"
//     }
// ],
// reference_people: [
//     {
//         reference_id: 2,
//         borrower_id: 30,
//         loan_id: 4,
//         first_name: "Schella",
//         last_name: "Jeune",
//         address: "eau chaude",
//         phone_number: "50932000000",
//         relation_to_borrower: "Amis",
//         createdAt: "2024-01-01T16:35:29.000Z",
//         updatedAt: "2024-01-01T16:35:29.000Z"
//     }
// ],
// payments: [
//     {
//         payment_id: 1,
//         loan_id: 4,
//         payment_date: "2023-12-31",
//         amount: "200.00",
//         capital: 100,
//         interest: 10,
//         payment_method_id: 1,
//         month_reference: "2023-12-31",
//         createdAt: "2024-01-01T13:18:25.000Z",
//         updatedAt: "2024-01-01T13:18:25.000Z",
//         payment_method: {
//             id: 1,
//             value: "Cash"
//         }
//     }
// ],