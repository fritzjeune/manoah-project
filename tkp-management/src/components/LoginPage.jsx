import React, { useState } from 'react';

const LoginPage = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login process (replace with actual authentication logic)
        if (formData.username === 'demoUser' && formData.password === 'demoPassword') {
            alert('Login successful!');
        } else {
            alert('Invalid username or password. Please try again.');
        }

        // Clear form fields after submission
        setFormData({ username: '', password: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <div className="mb-4 text-center">
                    {/* Replace 'YourCompanyLogo.png' with the actual logo file */}
                    <img src="YourCompanyLogo.png" alt="Company Logo" className="mx-auto h-16 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Login to Your Account</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <a href="/reset-password" className="text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <div>
                            <a href="/register" className="text-blue-500 hover:underline">
                                Don't have an account? Register here.
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
