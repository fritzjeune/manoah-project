import React from 'react'

const Contacts = ({address, contacts, email}) => {

    return (
        <div className='h-[500px]'>
            <h1 className='text-primary font-bold text-lg mb-[10px]'>Contacts Informations</h1>
            <div className='grid grid-cols-2 w-[600px]'>
                {address && <div>
                    <h1 className='text-secondary font-bold mb-[10px]'>Primary Address</h1>
                    <p>{address.street}</p>
                    <p>{address.city} {address.state}</p>
                    <p>{address.country || 'Haiti'}</p>
                </div>}
                <div>
                    <h1 className='text-secondary font-bold mb-[10px]'>Phone Number</h1>
                    {contacts && contacts.map((contact) => <p>{contact.phone_number}</p>)}
                    <p>{email}</p>
                </div>
            </div>
        </div>
    )
}

export default Contacts