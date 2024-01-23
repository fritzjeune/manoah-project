import React, { useMemo } from 'react';
import { useTable, useFilters } from 'react-table';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const MortgageTable = () => {
    // Replace this data with your actual loan data
    const data = [
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        { no: 1, payment_date: '2024-01-01', month_reference: '2023-12-30', amount: 5000, payment_method_id: 2500, loan_id: 4, status: 'Active', advisor: 'Jane Doe' },
        // Add more rows as needed
    ];

    const columns = [
        { Header: 'No', accessor: 'no' },
        { Header: 'Payment Date', accessor: 'payment_date', filter: 'date' },
        { Header: 'Ref. Month', accessor: 'month_reference', filter: 'date' },
        { Header: 'Amount', accessor: 'amount', filter: 'text' },
        { Header: 'Payment Method', accessor: 'payment_method_id', filter: 'text' },
        { Header: 'Loan Ref.', accessor: 'loan_id', filter: 'text' },
        {
            Header: 'Options',
            accessor: 'options',
            Cell: ({ row }) => (
                <div className="flex">
                    <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => handleEdit(row.original)}>
                        <FaEdit />
                    </button>
                    <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => handleView(row.original)}>
                        <FaEye />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.original)}>
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    const memoizedColumns = useMemo(() => columns, []);
    const memoizedData = useMemo(() => data, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
    } = useTable({ columns: memoizedColumns, data: memoizedData }, useFilters);

    const { setFilter } = state;

    const handleEdit = (rowData) => {
        // Add your edit logic here
        console.log('Edit clicked for row:', rowData);
    };

    const handleView = (rowData) => {
        // Add your view logic here
        console.log('View clicked for row:', rowData);
    };

    const handleDelete = (rowData) => {
        // Add your delete logic here
        console.log('Delete clicked for row:', rowData);
    };

    return (
        <div className='' style={{overflowY: "scroll", height: "100%"}}>
            <p className='text-primary font-bold text-lg mb-[10px]'>Posted Payments</p>
            <table {...getTableProps()} className="w-full border border-collapse">
                <thead className="sticky top-0 bg-white">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="py-2 text-left border-b bg-secondary"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="p-2 border-b">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MortgageTable;
