import React, { useState } from 'react';

const RegisterPage = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    // State to manage form errors
    const [formErrors, setFormErrors] = useState({});

    // Function to handle form submission
    const handleRegister = (e) => {
        e.preventDefault();

        // Validate form inputs
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Simulate registration process (replace with actual registration logic)
        alert('Registration successful!');

        // Clear form fields after submission
        setFormData({ email: '', username: '', password: '', confirmPassword: '', role: '' });
    };

    // Function to validate form inputs
    const validateForm = () => {
        const errors = {};

        // Validate email
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }

        // Validate username
        if (!formData.username) {
            errors.username = 'Username is required';
        }

        // Validate password
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!isValidPassword(formData.password)) {
            errors.password =
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
        }

        // Validate confirmation password
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirmation password is required';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Confirmation password must match the password';
        }

        // Validate role
        if (!formData.role) {
            errors.role = 'Role is required';
        }

        return errors;
    };

    // Function to check if the email is valid
    const isValidEmail = (email) => {
        // Simple email validation (replace with a more robust validation if needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to check if the password is valid
    const isValidPassword = (password) => {
        // Password must be at least 8 characters with at least one uppercase, one lowercase, one digit, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Register a New Account</h2>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${formErrors.email ? 'border-red-500' : 'focus:border-blue-300'
                                }`}
                            placeholder="Enter your email"
                            required
                        />
                        {formErrors.email && (
                            <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
                        )}
                    </div>
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
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${formErrors.username ? 'border-red-500' : 'focus:border-blue-300'
                                }`}
                            placeholder="Enter your username"
                            required
                        />
                        {formErrors.username && (
                            <p className="mt-2 text-sm text-red-500">{formErrors.username}</p>
                        )}
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
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${formErrors.password ? 'border-red-500' : 'focus:border-blue-300'
                                }`}
                            placeholder="Enter your password"
                            required
                        />
                        {formErrors.password && (
                            <p className="mt-2 text-sm text-red-500">{formErrors.password}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${formErrors.confirmPassword ? 'border-red-500' : 'focus:border-blue-300'
                                }`}
                            placeholder="Confirm your password"
                            required
                        />
                        {formErrors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-500">{formErrors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                            Role
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring ${formErrors.role ? 'border-red-500' : 'focus:border-blue-300'
                                }`}
                            placeholder="Enter your role"
                            required
                        />
                        {formErrors.role && <p className="mt-2 text-sm text-red-500">{formErrors.role}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
