// AddBorrowerPage.js
import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import AddressContactForm from './AddressContactForm';
import PersonalReferencesForm from './PersonalReferencesForm';
import { useNavigate } from 'react-router';

const AddBorrowerPage = () => {
    const navigate = useNavigate();
    const handleBasicInfoSubmit = (basicInfoData) => {
        // Handle submission of basic borrower information
        console.log('Basic Info:', basicInfoData);
        navigate("/borrower-profil")

    };

    const handleAddressContactSubmit = (addressContactData) => {
        // Handle submission of address and contact information
        console.log('Address & Contact Info:', addressContactData);
    };

    const handleReferencesSubmit = (referencesData) => {
        // Handle submission of personal references
        console.log('Personal References:', referencesData);
    };

    return (
        <div>
            <div className='w-100 h-[200px] grid place-items-center  bg-blue-600'>
                <h2 className=' text-white font-bold text-3xl px-[200px] text-center' >Ajouter un Client</h2>
            </div>
            {/* Render each form component */}
            <BasicInfoForm onSubmit={handleBasicInfoSubmit} />
            {/* <AddressContactForm onSubmit={handleAddressContactSubmit} />
            <PersonalReferencesForm onSubmit={handleReferencesSubmit} /> */}
        </div>
    );
};

export default AddBorrowerPage;
