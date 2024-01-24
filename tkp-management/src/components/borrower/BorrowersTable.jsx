import React, { useMemo } from 'react';
import { useTable, useFilters } from 'react-table';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BorrowersTable = ({data}) => {
    // Replace this data with your actual loan data
    // const data = [
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     { no: 1, last_name: 'Jean Jacques', first_name: 'Philippe', gender: "M", birthdate: "1992-01-01", nif: "001-001-003-0", createdAt: '2021-01-01', activeLoan: true },
    //     // Add more rows as needed
    // ];

    const columns = [
        { Header: 'No', accessor: 'borrower_id' },
        { Header: 'Nom', accessor: 'last_name', filter: 'text' },
        { Header: 'Prenom', accessor: 'first_name', filter: 'text' },
        { Header: 'Gender', accessor: 'gender', filter: 'text' },
        { Header: 'Birth Date', accessor: 'birthdate', filter: 'date' },
        { Header: 'NIF.', accessor: 'nif', filter: 'text' },
        { Header: 'NINU.', accessor: 'ninu', filter: 'text' },
        { Header: 'Date d\'Affiliation.', accessor: 'createdAt', filter: 'date' },
        { Header: 'Loan Active', accessor: 'loans[0].loan_status_id', filter: 'text' },
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
    const navigate = useNavigate();

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
            <div className="mb-4 flex flex-row justify-between">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border w-[400px] border-gray-300"
                    onChange={(e) => setFilter('last_name', e.target.value)}
                />
                <button className=' bg-secondary px-[20px] py-[5px] font-bold text-white' onClick={() => navigate('/add-borrowers')}>Add Borrower</button>
            </div>
            <div className='' style={{overflowY: "scroll", height: "800px"}}>
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
                                <tr {...row.getRowProps()} onClick={() => navigate('/borrower-profil')} >
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
        </div>
    );
};

export default BorrowersTable;
