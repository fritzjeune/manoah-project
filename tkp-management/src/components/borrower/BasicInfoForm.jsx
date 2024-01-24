// BasicInfoForm.js
import React, { useState } from 'react';
import { useCreateBorrowerMutation } from '../features/borrower/borrowerSlice';

const BasicInfoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        birthdate: '',
        city_of_birth: '',
        state_of_birth: '',
        country_of_birth: 'HT',
        gender: '',
        nif: '',
        ninu: '',
        occupation: '',
        email: '',
        address: {
            street: '',
            city: '',
            province: '',
            state: '',
            country: 'HT'
        },
        contacts: [
            {
                phone_number: '509 32090900'
            }
        ],
        profil_img_url: null, // To store the selected image file
    });
    const [phone, setPhone] = useState('')

    const [createBorrower, {}] = useCreateBorrowerMutation()

    const addressFieldHandler = (field) => (e) => {
        setFormData({...formData, address: {...formData.address, [field]: e.target.value}, })
    }

    const addPhoneHandler = () => () => {
        setFormData({...formData, contacts: formData.contacts.concat({phone_number: phone})})
        setPhone('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBorrower(formData)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            if (err) throw err
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profil_img_url: file });
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <div className='grid grid-cols-3 gap-[20px] py-[10px] m-auto'>
                <div className='col-span-2'>
                    <div className=' h-fit grid grid-cols-3 gap-[20px]'>
                        <div className="col-span-3">
                            <label htmlFor="lastName" className="block font-medium text-lg text-blue-400">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Entrer "
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="firstName" className="block font-medium text-lg text-blue-400">
                                Prenom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="firstName" className="block font-medium text-lg text-blue-400">
                                Sexe <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                        <div className="">
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
                                placeholder="0010000000"
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="nif" className="block font-medium text-lg text-blue-400">
                                NINU <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="ninu"
                                name="ninu"
                                value={formData.ninu}
                                onChange={(e) => setFormData({ ...formData, ninu: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="1000000000"
                                // required
                            />
                        </div>
                        <div className="">
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
                                placeholder="Agronome"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="birthDate" className="block font-medium text-lg text-blue-400">
                                Date de Naissance <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="cityOfBirth" className="block font-medium text-lg text-blue-400">
                                Ville de Naissance
                            </label>
                            <input
                                type="text"
                                id="city_of_birth"
                                name="city_of_b?irth"
                                value={formData.city_of_birth}
                                onChange={(e) => setFormData({ ...formData, city_of_birth: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter city of birth"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="stateOfBirth" className="block font-medium text-lg text-blue-400">
                                Departement de Naissance
                            </label>
                            <input
                                type="text"
                                id="state_of_birth"
                                name="state_of_birth"
                                value={formData.state_of_birth}
                                onChange={(e) => setFormData({ ...formData, state_of_birth: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter state of birth"
                            />
                        </div>
                        
                    </div>
                    <h1 className=' text-secondary font-semibold text-2xl my-[20px] p-[10px] bg-my_gray'>Informations de contact</h1>
                    <div className='grid grid-cols-3 gap-[20px]'>
                        {formData.contacts?.map((contact, i) => {
                            return (
                                <div className="">
                                    <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                        Phone {i + 1}
                                    </label>
                                    <input
                                        type="text"
                                        id={i}
                                        name={`contact_${i}`}
                                        value={contact.phone_number}
                                        readOnly
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            )
                        })}
                        
                        {formData.contacts.length < 2 && <div className=" relative">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Telephone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter occupation"
                            />
                            <button
                                type="button"
                                onClick={addPhoneHandler()}
                                className="w-fit m-auto py-[10px] px-[20px] bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 absolute"
                                >+</button>
                        </div>}
                        <div></div>
                        <div className="col-span-2">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter occupation"
                            />
                        </div>
                    </div>
                    <h1 className=' text-secondary font-semibold text-2xl my-[20px] p-[10px] bg-my_gray'>Adresse</h1>
                    <div className=' grid grid-cols-3 gap-[20px] h-fit'>
                        <div className="mb-4">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Departement 
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.address?.state}
                                onChange={addressFieldHandler('state')}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter occupation"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Commune
                            </label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                value={formData.address?.province}
                                onChange={addressFieldHandler('province')}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter occupation"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Ville 
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.address?.city}
                                onChange={addressFieldHandler('city')}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter occupation"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="occupation" className="block text-lg text-blue-400 font-medium">
                                Adresse
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.address?.street}
                                onChange={addressFieldHandler('street')}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="no 31, Rue pierre Sully"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
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
