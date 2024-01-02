// AddressAndContactForm.js
import React, { useState } from 'react';

const AddressContactForm = ({ onAddressSubmit, onContactSubmit }) => {
    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        state: '',
        isPropertyOwner: false,
    });

    const [contactData, setContactData] = useState({
        phoneNumbers: [''],
    });

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        onAddressSubmit(addressData);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        onContactSubmit(contactData);
    };

    const handleAddPhoneNumber = () => {
        setContactData({ ...contactData, phoneNumbers: [...contactData.phoneNumbers, ''] });
    };

    const handlePhoneNumberChange = (index, value) => {
        const updatedPhoneNumbers = [...contactData.phoneNumbers];
        updatedPhoneNumbers[index] = value;
        setContactData({ ...contactData, phoneNumbers: updatedPhoneNumbers });
    };

    return (
        <div className="flex">
            {/* Address Form */}
            <form onSubmit={handleAddressSubmit} className="flex-1 max-w-md mx-2 p-6 bg-white rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-600">
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={addressData.street}
                        onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter street"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter city"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={addressData.state}
                        onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter state"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isPropertyOwner" className="flex items-center">
                        <input
                            type="checkbox"
                            id="isPropertyOwner"
                            name="isPropertyOwner"
                            checked={addressData.isPropertyOwner}
                            onChange={(e) => setAddressData({ ...addressData, isPropertyOwner: e.target.checked })}
                            className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-600">Is Property Owner</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Submit Address
                </button>
            </form>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="flex-1 max-w-md mx-2 p-6 bg-white rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone Numbers</label>
                    {contactData.phoneNumbers.map((phoneNumber, index) => (
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
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Submit Contact
                </button>
            </form>
        </div>
    );
};

export default AddressContactForm;
