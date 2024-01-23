import React from 'react'

const Contacts = () => {
    return (
        <div className='h-[500px]'>
            <h1 className='text-primary font-bold text-lg mb-[10px]'>Contacts Informations</h1>
            <div className='grid grid-cols-2 w-[600px]'>
                <div>
                    <h1 className='text-secondary font-bold mb-[10px]'>Primary Address</h1>
                    <p>Route de lascahobas , no 37</p>
                    <p>Mirebalais , Centre</p>
                    <p>Haiti, HT5210</p>
                </div>
                <div>
                    <h1 className='text-secondary font-bold mb-[10px]'>Phone Number</h1>
                    <p>+509 3200 9099</p>
                    <p>+509 3200 9099</p>
                </div>
            </div>
        </div>
    )
}

export default Contacts