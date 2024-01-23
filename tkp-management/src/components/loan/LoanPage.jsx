import React from 'react'
import LoanTable from './LoanTable'

const LoanPage = () => {
    return (
        <div className=' p-[20px]'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className="text-primary font-extrabold text-3xl mb-[10px]">Loan Management</h1>
                <button className="bg-secondary text-white px-4 py-1 rounded-lg">Add Borrower</button>
            </div>
            <LoanTable />
        </div>
    )
}

export default LoanPage
