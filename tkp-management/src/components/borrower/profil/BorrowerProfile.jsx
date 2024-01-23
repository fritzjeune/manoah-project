import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you use React Router for navigation
import ReviewLine from '../../minis/ReviewLine';
import ProfileOptions from './ProfilOptions';
import LoanModal from '../LoanModal';
import LoanModalADB from '../../loan/LoanModalADB';


const BorrowerProfile = ({ loans }) => {
    const { loanId } = useParams(); // Assuming loanId is part of the route parameters
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const handleLoanSubmit = (payment) => {
        // Handle payment submission logic here
        console.log('Payment submitted:', payment);

        // Close the PaymentModal after submission
        setIsLoanModalOpen(false);
    };

    // Find the selected loan based on loanId
    const testBorrower = {
        lastname: 'Doe',
        firstname: 'John',
        birthDate: '1990-01-01',
        cityOfBirth: 'New York',
        stateOfBirth: 'NY',
        gender: "F",
        nif: '1234567890',
        createdAt: "2023-11-30", 
        occupation: 'Software Engineer',
        image: 'https://example.com/borrower-image.jpg', // Add the image URL here
        address: [
            {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                isPropertyOwner: true,
            },
            // Add more contact information as needed
        ],
        contacts: {
            email: 'jean@abc.com',
            phones: [50930000000, 50932000000]
        },
        personalReferences: [
            {
                lastname: 'Smith',
                firstname: 'Jane',
                address: '456 Oak St',
                phoneNumbers: ['555-1234', '555-5678'],
                relation: 'Friend',
            },
            {
                lastname: 'Smith',
                firstname: 'Jane',
                address: '456 Oak St',
                phoneNumbers: ['555-1234', '555-5678'],
                relation: 'Friend',
            },
            // Add more personal references as needed
        ],
        loan: {
            amountRequested: 50000,
            interestRate: 5.5,
            mortgageLength: 36,
            reasonForLoan: 'Home Improvement',
            approvalDate: '2023-08-15',
            paymentEndDate: '2026-08-15',
            // Add more details as needed
        }
    };
    // const testBorrower = loans.find((loan) => loan.no === parseInt(loanId, 10));

    if (!testBorrower) {
        return <div>Loan not found</div>;
    }

    // const { no, lastname, firstname, amountApprouved, balance, endDate, status, advisor } = testBorrower;

    return (
        <div className='p-[20px]'>
            <div className='flex items-center gap-[20px] mb-[20px]'>
                <h1 className=' text-primary font-extrabold text-3xl'>{testBorrower.lastname + " " + testBorrower.firstname}</h1>
                <p className=' bg-yellow-300 px-[30px] py-[5px] rounded-lg'>Active</p>
            </div>

            <div className="grid gap-4">
                <div className='flex justify-start gap-[20px]'>
                    {/* <h2 className="text-lg font-semibold mb-2">Loan Information</h2> */}
                    <div className="flex items-center justify-center mb-4 w-[200px]">
                        <img
                            src="./profil-avatar.webp" // Replace with the actual URL for the avatar image
                            alt={`Avatar for ${testBorrower.firstname} ${testBorrower.lastname}`}
                            className="rounded-full h-full w-full"
                        />
                    </div>
                    <div className='grid grid-cols-12 w-[60%] gap-[20px]'>
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Last Name"
                            text={testBorrower.lastname}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="first Name"
                            text={testBorrower.firstname}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="NIF"
                            text={testBorrower.nif}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Birth Date"
                            text={testBorrower.birthDate}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="gender"
                            text={testBorrower.gender}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Ville de naissance"
                            text={testBorrower.cityOfBirth}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Departement de naissance"
                            text={testBorrower.stateOfBirth}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Occupation"
                            text={testBorrower.occupation}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Mortgage Lenth"
                            text={testBorrower.address[0]?.street}
                        />
                        <ReviewLine
                            boxStyle="flex-col col-span-4"
                            labelStyle="text-sm text-secondary"
                            label="Regestered Date"
                            text={testBorrower.createdAt}
                        />
                    </div>
                    <div className='flex flex-col gap-[10px] relative'>
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={() => setIsLoanModalOpen(true)}>
                            Add Loan
                        </button>
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={()=> {}}>
                            Update Personal Infos
                        </button>
                        
                        <button className="bg-secondary text-white py-[5px] px-[50px] rounded" onClick={()=> {}}>
                            Update Contact Infos
                        </button>
                    </div>
                </div>
                <div>
                    <ProfileOptions />
                </div>
            </div>
            <LoanModal
                isOpen={isLoanModalOpen}
                onRequestClose={() => setIsLoanModalOpen(false)}
                onPaymentSubmit={handleLoanSubmit}
            />
        </div>
    );
};

export default BorrowerProfile;




// // BorrowerProfile.js
// import React, { useState } from 'react';
// import LoanModal from './LoanModal'; // Adjust the import path
// import Modal from 'react-modal';
// import LoanPreviewCard from './LoanCardPreview';

// const BorrowerProfile = () => {
//     const [isLoanModalOpen, setLoanModalOpen] = useState(false);
//     const [loans, setLoans] = useState([]); // Track loans for the borrower

//     // Test data for a borrower
    

//     const openLoanModal = () => {
//         setLoanModalOpen(true);
//     };

//     const closeLoanModal = () => {
//         setLoanModalOpen(false);
//     };

//     const handleLoanSubmit = (newLoan) => {
//         // Handle loan submission logic, e.g., updating state
//         setLoans([...loans, newLoan]);
//     };

//     const renderAddress = () => {
//         return testBorrower.address.map((add, index) => (
//             <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
//                 <h2 className="text-xl font-semibold mb-2 text-blue-600">Adresse:</h2>
//                 <div>
//                     <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Rue:</span> <span>{add.street}</span></div>
//                     <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Ville:</span> <span>{add.city}</span></div>
//                     <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Departement:</span> <span>{add.state}</span></div>
//                     <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Maison privee?:</span> <span>{add.isPropertyOwner ? 'Oui' : 'Non'}</span></div>
//                 </div>
//             </div>
//         ));
//     };

//     const renderContacts = () => {
//         let contact = testBorrower.contacts
//         return  (
//             <div className="bg-white p-4 mb-4 rounded-md shadow-md">
//                 <h2 className="text-xl font-semibold mb-2 text-blue-600">Contacts:</h2>
//                 <div>
//                     {contact.phones.map((phone) => <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">:</span> <span>{phone}</span></div>)}
//                     <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Ville:</span> <span>{testBorrower.contacts.email}</span></div>
//                 </div>
//             </div>
//         )
//     };

//     const renderReferences = () => {
//         return testBorrower.personalReferences.map((reference, index) => (
//             <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
//                 <p><span className="font-semibold">Last Name:</span> {reference.lastName}</p>
//                 <p><span className="font-semibold">First Name:</span> {reference.firstName}</p>
//                 <p><span className="font-semibold">Address:</span> {reference.address}</p>
//                 <p><span className="font-semibold">Phone Numbers:</span> {reference.phoneNumbers.join(', ')}</p>
//                 <p><span className="font-semibold">Relation to Borrower:</span> {reference.relation}</p>
//             </div>
//         ));
//     };

//     return (
//         <div className="">
//             <div className='w-100 h-[200px] grid place-items-center  bg-blue-600'>
//                 <h2 className=' text-white font-bold text-3xl px-[200px] text-center' >Nom du Client - Profil</h2>
//             </div> 
//             <div className='grid grid-cols-5 w-[80%] mx-auto mt-[20px] gap-[20px]'>
//                 <div className=' mx-auto w-full col-span-3'>
//                     <div className='flex flex-row' >
//                         <div className="bg-white p-6 mb-6 rounded-md shadow-md" style={{ width : "calc(100% - 200px)"}}>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Last Name:</span> <span>{testBorrower.lastName}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">First Name:</span> <span>{testBorrower.firstName}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Birth Date:</span> <span>{testBorrower.birthDate}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">City of Birth:</span> <span>{testBorrower.cityOfBirth}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">State of Birth:</span> <span>{testBorrower.stateOfBirth}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">NIF:</span> <span>{testBorrower.nif}</span></div>
//                             <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Occupation:</span> <span>{testBorrower.occupation}</span></div>
//                         </div>
//                         {testBorrower.image && (
//                             <div className="mb-4 w-[200px] h-[200px]">
//                                 <img src={testBorrower.image} alt="Borrower" className="rounded-full h-full w-full mx-auto mb-2" />
//                             </div>
//                         )}
//                     </div>
//                     <div className='grid grid-cols-2 gap-[20px]'>
//                         {renderAddress()}
//                         {renderContacts()}
//                     </div>
//                     <div>
//                         <p className='text-xl font-semibold mb-2 text-blue-600'>References Personelles: </p>
//                         <div className='grid grid-cols-2 gap-[20px]'>
//                             {renderReferences()}
//                         </div>
//                     </div>

//                     {/* Button to open Loan Modal */}
//                     <button onClick={openLoanModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
//                         Add New Loan
//                     </button>

//                     {/* Loan Modal */}
//                     <LoanModal isOpen={isLoanModalOpen} onRequestClose={closeLoanModal} onLoanSubmit={handleLoanSubmit} />
//                 </div>
//                 <div className='col-span-2'>
//                     <LoanPreviewCard loanDetails={testBorrower.loan} />
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default BorrowerProfile;
