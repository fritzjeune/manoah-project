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
        <div className=' p-[40px]'>
            <h1 className=' text-secondary font-bold text-4xl'>Enregistrer un nouveau client</h1>
            <BasicInfoForm onSubmit={handleBasicInfoSubmit} />
            {/* <AddressContactForm onSubmit={handleAddressContactSubmit} />
            <PersonalReferencesForm onSubmit={handleReferencesSubmit} /> */}
        </div>
    );
};

export default AddBorrowerPage;
