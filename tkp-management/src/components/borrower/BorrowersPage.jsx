import React from 'react'
import BorrowersTable from './BorrowersTable'
import LoaderComponent from '../minis/Loader'
import { useGetBorrowerListMutation } from '../features/borrower/borrowerSlice'
import { useEffect } from 'react'

const BorrowersPage = () => {

    const [getBorrowerList, { data, isLoading }] = useGetBorrowerListMutation()

    useEffect(() => {
        getBorrowerList()
        console.log(data)
    }, [])

    return (
        <div className=" p-[20px]">
            <h1 className=' text-primary font-extrabold text-3xl mb-[10px]'>Borrower Management</h1>
            {data && <BorrowersTable data={data} />}
            {isLoading && <LoaderComponent />}
        </div>
    )
}

export default BorrowersPage
