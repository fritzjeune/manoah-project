import React from 'react'
import LoanItem from './LoanItem'

const BorrowerLoans = ({loans}) => {
    return (
        <div className='h-[500px] grid grid-cols-2'>
            {/* Active loans */}
            <div>
                <h1 className='text-primary font-bold text-lg mb-[10px]'>Active Loans</h1>
                <div className=' overflow-y-scroll ' style={{height: 'calc(100% - 30px)'}}>
                    <div className=' flex flex-col gap-[20px] h-full'>
                        {loans.length > 0 ? loans.map(loan => loan.loan_status?.id === 1 && <LoanItem loan={loan} id={loan.loan_id}/>) : <h1>Pas de pret active.</h1> }
                    </div>
                </div>
            </div>
            <div className='h-[500px]'>
                <h1 className='text-primary font-bold text-lg mb-[10px]'>Closed Loans</h1>
                <div className=' overflow-y-scroll ' style={{height: 'calc(100% - 30px)'}}>
                    <div className=' flex flex-col gap-[20px] h-full'>
                        {loans.length > 0 ? loans.map(loan => loan.loan_status?.id !== 1 && <LoanItem loan={loan} id={loan.loan_id}/>) : <h1>Pas de pret anterieur.</h1> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowerLoans