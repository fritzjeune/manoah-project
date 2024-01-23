import React, { useMemo } from 'react';
import { useTable, useFilters } from 'react-table';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const LoanTable = () => {
    // Replace this data with your actual loan data
    const data = [
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        { no: 1, lastname: 'Doe', firstname: 'John', amountApprouved: 5000, balance: 2500, endDate: '2024-12-31', status: 'Active', advisor: 'Jane Doe' },
        // Add more rows as needed
    ];

    const columns = [
        { Header: 'No', accessor: 'no' },
        { Header: 'Last Name', accessor: 'lastname', filter: 'text' },
        { Header: 'First Name', accessor: 'firstname', filter: 'text' },
        { Header: 'Amount Approved', accessor: 'amountApprouved', filter: 'text' },
        { Header: 'Balance', accessor: 'balance', filter: 'text' },
        { Header: 'End Date', accessor: 'endDate', filter: 'text' },
        { Header: 'Status', accessor: 'status', filter: 'text' },
        { Header: 'Advisor', accessor: 'advisor', filter: 'text' },
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
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300"
                    onChange={(e) => setFilter('lastname', e.target.value)}
                />
            </div>
            <table {...getTableProps()} className="w-full border border-collapse">
                <thead>
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

export default LoanTable;
