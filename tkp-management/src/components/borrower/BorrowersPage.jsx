import React from 'react'
import BorrowersTable from './BorrowersTable'
import LoaderComponent from '../minis/Loader'

const BorrowersPage = () => {
    return (
        <div className=" p-[20px]">
            <h1 className=' text-primary font-extrabold text-3xl mb-[10px]'>Borrower Management</h1>
            <BorrowersTable />
            <LoaderComponent />
        </div>
    )
}

export default BorrowersPage
