// LoanModalActions.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import 'jspdf-autotable';

const LoanModalActions = ({ generateMortgageTable, referTo,  }) => {
    // const modalContentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => referTo.current,
    });


    const handleDownloadAsPDF = () => {
        // Check if the element with the ID 'mortgageTable' exists
        const tableElement = document.getElementById('mortgageTable');
        if (!tableElement) {
            console.error('Table element not found');
            return;
        }

        // Get the HTML content of the mortgage table
        const tableHtml = tableElement.outerHTML;

        // Set up the configuration for html2pdf
        const options = {
            margin: 10,
            filename: 'loan_details.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Use html2pdf to generate the PDF
        html2pdf().from(tableHtml).set(options).outputPdf((pdf) => {
            pdf.save();
        });
    };




    return (
        <>
            <button
                onClick={handlePrint}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
            >
                Print
            </button>
            <button
                onClick={handleDownloadAsPDF}
                className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
            >
                Download as PDF
            </button>
            {/* {generateMortgageTable && generateMortgageTable()} */}
        </>
    );
};

export default LoanModalActions;
