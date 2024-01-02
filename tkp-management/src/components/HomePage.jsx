import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
            <Card to="/dashboard" label="Go to Dashboard" icon="dashboard" color="bg-blue-500" />
            <Card to="/loan-list" label="Loan List / Manage Loans" icon="loan" color="bg-green-500" />
            <Card to="/add-borrower" label="Add a New Borrower" icon="person_add" color="bg-yellow-500" />
            <Card to="/search-borrower" label="Search for a Borrower" icon="search" color="bg-purple-500" />
            <Card to="/reports" label="Go to Reports Page" icon="description" color="bg-indigo-500" />
            <Card to="/audit" label="Audit" icon="security" color="bg-red-500" />
            {/* Add more cards for additional options */}
        </div>
    );
};

const Card = ({ to, label, icon, color }) => {
    return (
        <Link to={to} className={`m-4 p-6 max-w-xs rounded-md shadow-md cursor-pointer ${color}`}>
            <div className="text-4xl text-white mb-2">{getIcon(icon)}</div>
            <p className="text-xl font-semibold text-white">{label}</p>
        </Link>
    );
};

const getIcon = (icon) => {
    // You can use a library like Material-UI icons or any other icon set
    // Replace the icons below with the actual icons you want to use
    switch (icon) {
        case 'dashboard':
            return '📊';
        case 'loan':
            return '💵';
        case 'person_add':
            return '👤';
        case 'search':
            return '🔍';
        case 'description':
            return '📄';
        case 'security':
            return '🔐';
        default:
            return '';
    }
};

export default HomePage;
