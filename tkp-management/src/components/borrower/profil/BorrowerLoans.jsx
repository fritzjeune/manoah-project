import React from 'react'
import LoanItem from './LoanItem'

const BorrowerLoans = () => {
    return (
        <div className='h-[500px] grid grid-cols-2'>
            {/* Active loans */}
            <div>
                <h1 className='text-primary font-bold text-lg mb-[10px]'>Active Loans</h1>
                <div>
                    <LoanItem />
                </div>
            </div>
            <div className='h-[500px]'>
                <h1 className='text-primary font-bold text-lg mb-[10px]'>Closed Loans</h1>
                <div className=' overflow-y-scroll ' style={{height: 'calc(100% - 30px)'}}>
                    <div className=' flex flex-col gap-[20px] h-full'>
                        <LoanItem isClosed={true}/>
                        <LoanItem isClosed={true}/>
                        <LoanItem isClosed={true}/>
                        <LoanItem isClosed={true}/>
                        <LoanItem isClosed={true}/>
                        <LoanItem isClosed={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowerLoans