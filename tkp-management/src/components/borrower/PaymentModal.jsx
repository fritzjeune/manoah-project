// PaymentModal.js
import React from 'react';
import Modal from 'react-modal';
import PaymentForm from './PaymentForm';

const PaymentModal = ({ isOpen, onRequestClose, onPaymentSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            // overlayClassName="fixed inset-0 bg-black opacity-50"
            // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
            overlayClassName="fixed inset-0 bg-blue-100 opacity-100"
            // bodyOpenClassName=" opacity-100"
            // portalClassName=" opacity-100",
            
            className="absolute top-1/2 opacity-100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
        >
            <PaymentForm onPaymentSubmit={onPaymentSubmit} />
        </Modal>
    );
};

export default PaymentModal;
