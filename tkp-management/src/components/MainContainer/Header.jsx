import React from 'react';
import { FaUser } from 'react-icons/fa';

const Header = () => {
    // Replace these values with your actual user data
    const isLoggedIn = true; // Change to false if the user is not logged in
    const userName = 'John Doe'; // Replace with the actual user's name

    const handleLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
    };

    return (
        <header className="bg-primary text-secondary h-[60px] w-full p-[10px] flex items-center justify-between px-4">
            {/* Search Bar (You can replace it with your actual search component) */}
            <input
                type="text"
                placeholder="Search..."
                className="h-full w-1/3 p-2 rounded border-secondary border-2 bg-white"
            />
            <div className='flex gap-[20px]'>
                <div className="flex items-center">
                    <div className="mr-4">
                        <FaUser className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold">{userName}</p>
                    </div>
                </div>
                {isLoggedIn ? (
                    <button
                        className="bg-secondary text-white px-4 py-1 rounded-lg"
                        // className="text-gray-300 hover:text-white transition duration-300"
                        onClick={handleLogout}>
                        Logout</button>
                ) : (
                    // If not logged in, you can display a login button or any other authentication method
                    <button className="bg-secondary text-white px-4 py-2 rounded" onClick={()=> {}}>
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
