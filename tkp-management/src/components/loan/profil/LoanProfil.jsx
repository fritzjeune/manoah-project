import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you use React Router for navigation
import ReviewLine from '../../minis/ReviewLine';
import ProfileOptions from './ProfilOptions';
import PaymentModal from '../../borrower/PaymentModal';
import ReferencePersonModal from './ReferencePersonModal';

const LoanProfilePage = ({ loans }) => {
    const { loanId } = useParams(); // Assuming loanId is part of the route parameters
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isReferencePersonModalOpen, setIsReferencePersonModalOpen] = useState(false);
    const handlePaymentSubmit = (payment) => {
        // Handle payment submission logic here
        console.log('Payment submitted:', payment);

        // Close the PaymentModal after submission
        setIsPaymentModalOpen(false);
    };
    const handleReferencePersonSubmit = (payment) => {
        // Handle payment submission logic here
        console.log('Payment submitted:', payment);

        // Close the PaymentModal after submission
        setIsReferencePersonModalOpen(false);
    };

    // Find the selected loan based on loanId
    const selectedLoan = { 
        no: 1, 
        lastname: 'Doe', 
        firstname: 'John', 
        nif: "001-002-003-4", 
        requestedDate: "2023-01-01",
        approvalDate: "2023-01-01",
        mortgageDate: "2023-01-01",
        requestedAmount: 5000, 
        amountApprouved: 5000, 
        totalLoan: 6000,
        totalInterest: 1000,
        mortgagelength: 36,
        balance: 2500, 
        endDate: '2024-12-31', 
        status: 'Active', 
        advisor: 'Jane Doe' 
    }
    // const selectedLoan = loans.find((loan) => loan.no === parseInt(loanId, 10));

    if (!selectedLoan) {
        return <div>Loan not found</div>;
    }

    const { no, lastname, firstname, amountApprouved, balance, endDate, status, advisor } = selectedLoan;

    return (
        <div className='p-[20px]'>
            <div className='flex items-center gap-[20px] mb-[20px]'>
                <h1 className=' text-secondary font-extrabold text-3xl'>Loan Details:</h1>
                <p className=' bg-yellow-300 px-[30px] py-[5px] rounded-lg'>Active</p>
            </div>

            <div className="grid gap-4">
                <div className='flex justify-start gap-[20px]'>
                    {/* <h2 className="text-lg font-semibold mb-2">Loan Information</h2> */}
                    <div className="flex items-center justify-center mb-4 w-[200px]">
                        <img
                            src={`https://avatars.example.com/${no}.png`} // Replace with the actual URL for the avatar image
                            alt={`Avatar for ${firstname} ${lastname}`}
                            className="rounded-full h-16 w-16"
                        />
                    </div>
                    <div className='grid grid-cols-12 w-[60%] gap-[20px]'>
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Last Name"
                            text={selectedLoan.lastname}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="first Name"
                            text={selectedLoan.firstname}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="NIF"
                            text={selectedLoan.nif}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Requested Amount"
                            text={selectedLoan.requestedAmount}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Requested Date"
                            text={selectedLoan.requestedDate}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Approuved Amount"
                            text={selectedLoan.amountApprouved}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Total Loan"
                            text={selectedLoan.totalLoan}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Total Interest"
                            text={selectedLoan.totalInterest}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Mortgage Lenth"
                            text={selectedLoan.mortgagelength}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Aprouved date"
                            text={selectedLoan.approvalDate}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Mortgage date"
                            text={selectedLoan.mortgageDate}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Loan End Date"
                            text={selectedLoan.endDate}
                        />
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={()=> {}}>
                            Add Pledge
                        </button>
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={() => setIsReferencePersonModalOpen(true)}>
                            Update or Personal References
                        </button>
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={() => setIsPaymentModalOpen(true)}>
                            Make Payments
                        </button>
                    </div>
                </div>
                <div>
                    <ProfileOptions />
                </div>
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onRequestClose={() => setIsPaymentModalOpen(false)}
                    onPaymentSubmit={handlePaymentSubmit}
                />
                <ReferencePersonModal
                    isOpen={isReferencePersonModalOpen}
                    onRequestClose={() => setIsReferencePersonModalOpen(false)}
                    onPaymentSubmit={handleReferencePersonSubmit}
                />
            </div>
        </div>
    );
};

export default LoanProfilePage;
