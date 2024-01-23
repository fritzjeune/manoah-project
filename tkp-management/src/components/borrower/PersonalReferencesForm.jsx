// PersonalReferencesForm.js
import React, { useState } from 'react';

const PersonalReferencesForm = ({ onSubmit }) => {
    const [referenceData, setReferenceData] = useState({
        lastName: '',
        firstName: '',
        address: '',
        phoneNumbers: [''],
        relation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(referenceData);
    };

    const handleAddPhoneNumber = () => {
        setReferenceData({ ...referenceData, phoneNumbers: [...referenceData.phoneNumbers, ''] });
    };

    const handlePhoneNumberChange = (index, value) => {
        const updatedPhoneNumbers = [...referenceData.phoneNumbers];
        updatedPhoneNumbers[index] = value;
        setReferenceData({ ...referenceData, phoneNumbers: updatedPhoneNumbers });
    };

    return (
        <form onSubmit={handleSubmit} className="w-[500px] mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className='text-3xl mb-[10px] font-semibold text-primary'>Reference Person</h1>
            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                    Last Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={referenceData.lastName}
                    onChange={(e) => setReferenceData({ ...referenceData, lastName: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter last name"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                    First Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={referenceData.firstName}
                    onChange={(e) => setReferenceData({ ...referenceData, firstName: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter first name"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={referenceData.address}
                    onChange={(e) => setReferenceData({ ...referenceData, address: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter address"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone Numbers</label>
                {referenceData.phoneNumbers.map((phoneNumber, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder={`Enter phone number ${index + 1}`}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddPhoneNumber}
                    className="text-sm text-blue-500 hover:underline focus:outline-none"
                >
                    Add Phone Number
                </button>
            </div>
            <div className="mb-4">
                <label htmlFor="relation" className="block text-sm font-medium text-gray-600">
                    Relation to Borrower
                </label>
                <select
                    id="relation"
                    name="relation"
                    value={referenceData.relation}
                    onChange={(e) => setReferenceData({ ...referenceData, relation: e.target.value })}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">Select Relation</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Submit References
            </button>
        </form>
    );
};

export default PersonalReferencesForm;
