// BasicInfoForm.js
import React, { useState } from 'react';

const BasicInfoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        birthDate: '',
        cityOfBirth: '',
        stateOfBirth: '',
        nif: '',
        occupation: '',
        profilePicture: null, // To store the selected image file
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    return (
        <form onSubmit={handleSubmit} className="my-[20px] p-6 bg-white rounded-md shadow-md">
            <div className='grid grid-cols-3 gap-[20px] w-[80%] m-auto'>
                <div className='col-span-2 '>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block font-medium text-lg text-blue-400">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter last name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block font-medium text-lg text-blue-400">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="birthDate" className="block font-medium text-lg text-blue-400">
                            Birthday <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cityOfBirth" className="block font-medium text-lg text-blue-400">
                            City of Birth
                        </label>
                        <input
                            type="text"
                            id="cityOfBirth"
                            name="cityOfBirth"
                            value={formData.cityOfBirth}
                            onChange={(e) => setFormData({ ...formData, cityOfBirth: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter city of birth"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stateOfBirth" className="block font-medium text-lg text-blue-400">
                            State of Birth
                        </label>
                        <input
                            type="text"
                            id="stateOfBirth"
                            name="stateOfBirth"
                            value={formData.stateOfBirth}
                            onChange={(e) => setFormData({ ...formData, stateOfBirth: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter state of birth"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nif" className="block font-medium text-lg text-blue-400">
                            NIF (National ID) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="nif"
                            name="nif"
                            value={formData.nif}
                            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter NIF"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                            Occupation
                        </label>
                        <input
                            type="text"
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter occupation"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePicture" className="block font-medium text-lg text-blue-400">
                        Profile Picture
                    </label>
                    <div className="grid grid-rows-2 justify-center">
                        <div className="w-[300px] h-[300px] bg-gray-200 rounded-full overflow-hidden">
                            {formData.profilePicture ? (
                                <img
                                    src={URL.createObjectURL(formData.profilePicture)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className='mt-[40px] grid justify-center align-top'>
                            <label
                                htmlFor="profilePicture"
                                className="ml-4 h-fit cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                {formData.profilePicture ? 'Update Image' : 'Add Image'}
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid place-items-center'>
                <button
                    type="submit"
                    className="w-fit m-auto py-2 px-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >Ajouter Client</button>
            </div>
        </form>
    );
};

export default BasicInfoForm;
