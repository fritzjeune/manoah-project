import React from 'react'
import ReviewLine from '../../minis/ReviewLine'
import { useNavigate } from 'react-router-dom'

const LoanItem = ({isClosed}) => {
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
                    text="2022-12-10"
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Mortgage Date"
                    text="2022-12-10"
                />
                <ReviewLine
                    boxStyle="flex-col "
                    labelStyle="text-sm text-secondary"
                    label="End Date"
                    text="2024-12-11"
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Approuved Amount"
                    text="300000"
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Total Loan"
                    text="330000"
                />
                <ReviewLine
                    boxStyle="flex-col"
                    labelStyle="text-sm text-secondary"
                    label="Status"
                    text="Active"
                />
            </div>
            <div className={`w-[60px] ${isClosed ? 'bg-yellow-200' : 'bg-secondary'} flex justify-center`}>
                <p style={{ writingMode: 'vertical-lr', margin: 'auto'}}>{isClosed ? "Closed" : "Active"}</p>
            </div>
        </div>
    )
}

export default LoanItem