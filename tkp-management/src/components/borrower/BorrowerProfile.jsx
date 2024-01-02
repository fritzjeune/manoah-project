// BorrowerProfile.js
import React, { useState } from 'react';
import LoanModal from './LoanModal'; // Adjust the import path
import Modal from 'react-modal';
import LoanPreviewCard from './LoanCardPreview';

const BorrowerProfile = () => {
    const [isLoanModalOpen, setLoanModalOpen] = useState(false);
    const [loans, setLoans] = useState([]); // Track loans for the borrower

    // Test data for a borrower
    const testBorrower = {
        lastName: 'Doe',
        firstName: 'John',
        birthDate: '1990-01-01',
        cityOfBirth: 'New York',
        stateOfBirth: 'NY',
        nif: '1234567890',
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
                lastName: 'Smith',
                firstName: 'Jane',
                address: '456 Oak St',
                phoneNumbers: ['555-1234', '555-5678'],
                relation: 'Friend',
            },
            {
                lastName: 'Smith',
                firstName: 'Jane',
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

    const openLoanModal = () => {
        setLoanModalOpen(true);
    };

    const closeLoanModal = () => {
        setLoanModalOpen(false);
    };

    const handleLoanSubmit = (newLoan) => {
        // Handle loan submission logic, e.g., updating state
        setLoans([...loans, newLoan]);
    };

    const renderAddress = () => {
        return testBorrower.address.map((add, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-blue-600">Adresse:</h2>
                <div>
                    <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Rue:</span> <span>{add.street}</span></div>
                    <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Ville:</span> <span>{add.city}</span></div>
                    <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Departement:</span> <span>{add.state}</span></div>
                    <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Maison privee?:</span> <span>{add.isPropertyOwner ? 'Oui' : 'Non'}</span></div>
                </div>
            </div>
        ));
    };

    const renderContacts = () => {
        let contact = testBorrower.contacts
        return  (
            <div className="bg-white p-4 mb-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-blue-600">Contacts:</h2>
                <div>
                    {contact.phones.map((phone) => <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">:</span> <span>{phone}</span></div>)}
                    <div className='grid grid-cols-2 text-lg'><span className="font-semibold text-blue-600">Ville:</span> <span>{testBorrower.contacts.email}</span></div>
                </div>
            </div>
        )
    };

    const renderReferences = () => {
        return testBorrower.personalReferences.map((reference, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
                <p><span className="font-semibold">Last Name:</span> {reference.lastName}</p>
                <p><span className="font-semibold">First Name:</span> {reference.firstName}</p>
                <p><span className="font-semibold">Address:</span> {reference.address}</p>
                <p><span className="font-semibold">Phone Numbers:</span> {reference.phoneNumbers.join(', ')}</p>
                <p><span className="font-semibold">Relation to Borrower:</span> {reference.relation}</p>
            </div>
        ));
    };

    return (
        <div className="">
            <div className='w-100 h-[200px] grid place-items-center  bg-blue-600'>
                <h2 className=' text-white font-bold text-3xl px-[200px] text-center' >Nom du Client - Profil</h2>
            </div> 
            <div className='grid grid-cols-5 w-[80%] mx-auto mt-[20px] gap-[20px]'>
                <div className=' mx-auto w-full col-span-3'>
                    <div className='flex flex-row' >
                        <div className="bg-white p-6 mb-6 rounded-md shadow-md" style={{ width : "calc(100% - 200px)"}}>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Last Name:</span> <span>{testBorrower.lastName}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">First Name:</span> <span>{testBorrower.firstName}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Birth Date:</span> <span>{testBorrower.birthDate}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">City of Birth:</span> <span>{testBorrower.cityOfBirth}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">State of Birth:</span> <span>{testBorrower.stateOfBirth}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">NIF:</span> <span>{testBorrower.nif}</span></div>
                            <div className='grid grid-cols-3 text-lg '><span className=" text-blue-600 font-semibold">Occupation:</span> <span>{testBorrower.occupation}</span></div>
                        </div>
                        {testBorrower.image && (
                            <div className="mb-4 w-[200px] h-[200px]">
                                <img src={testBorrower.image} alt="Borrower" className="rounded-full h-full w-full mx-auto mb-2" />
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-2 gap-[20px]'>
                        {renderAddress()}
                        {renderContacts()}
                    </div>
                    <div>
                        <p className='text-xl font-semibold mb-2 text-blue-600'>References Personelles: </p>
                        <div className='grid grid-cols-2 gap-[20px]'>
                            {renderReferences()}
                        </div>
                    </div>

                    {/* Button to open Loan Modal */}
                    <button onClick={openLoanModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Add New Loan
                    </button>

                    {/* Loan Modal */}
                    <LoanModal isOpen={isLoanModalOpen} onRequestClose={closeLoanModal} onLoanSubmit={handleLoanSubmit} />
                </div>
                <div className='col-span-2'>
                    <LoanPreviewCard loanDetails={testBorrower.loan} />
                </div>
            </div>
            
        </div>
    );
};

export default BorrowerProfile;
