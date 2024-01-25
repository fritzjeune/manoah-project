import React from 'react'
import ReviewLine from '../../minis/ReviewLine'
import { useNavigate } from 'react-router-dom'

const LoanItem = ({loan}) => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-shrink-0 rounded-xl overflow-hidden' onClick={() => navigate('/loan-profil')}>
            <div className='w-[160px] bg-primary'>

            </div>
            <div className='bg-blue-100 overflow-hidden' style={{display: 'grid', padding: '20px', gap: '20px', maxWidth: '500px', height: 'max-content', gridTemplateColumns: '1fr 1fr 1fr' }}>
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Approuved Date"
                    text={new Date(loan.approval_date).toLocaleDateString()}
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Mortgage Date"
                    text={new Date(loan.approval_date).getDate()}
                />
                <ReviewLine
                    boxStyle="flex-col "
                    labelStyle="text-sm text-secondary"
                    label="End Date"
                    text={new Date(loan.payment_end_date).toLocaleDateString()}
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Approuved Amount"
                    text={loan.approuved_amount}
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Total Loan"
                    text={loan.total_loan}
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Status"
                    text={loan.loan_status?.value}
                />
            </div>
            <div className={`w-[60px] ${loan.loan_status?.id === 3 ? 'bg-yellow-200' : loan.loan_status?.id === 2 ? 'bg-red-500' : 'bg-secondary'} flex justify-center`}>
                <p style={{ writingMode: 'vertical-lr', margin: 'auto'}}>{loan.loan_status?.id === 3 ? "Closed" : "Active"}</p>
            </div>
        </div>
    )
}

export default LoanItem