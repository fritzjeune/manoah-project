import React, { useState, } from 'react';
import { FaHome, FaUser, FaCog, FaChartBar, FaFile } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMainOption } from '../features/PagesSlice';

const SubMenu = ({ subOptions, onSubOptionClick }) => {
    return (
        <ul className="ml-6">
            {subOptions.map((subOption, index) => (
                <li key={index} className="menu-item p-[15px]" onClick={() => onSubOptionClick(subOption.href)}>
                    <a href={subOption.href} className='flex items-center gap-[5px]'>
                        <FaFile className="w-6 h-6" />
                        <span>{subOption.title}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

const SideMenu = () => {
    const [isMenuCollapsed, setMenuCollapsed] = useState(false);
    const activeMainOption = useSelector(state => state.page.activeMainOption);

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setMenuCollapsed(!isMenuCollapsed);
    };

    const handleMainOptionClick = (mainOption) => {
        dispatch(setActiveMainOption(activeMainOption === mainOption ? null : mainOption));
    };

    const handleSubOptionClick = (subOption) => {
        console.log(`Sub Option Clicked: ${subOption}`);
        // Add your custom logic here
    };

    // Hooks 
    const activePage = useSelector(state => state.page.activePage)
    console.log(activePage)

    const mainOptions = [
        { 
            icon: <FaHome className="w-6 h-6" />, 
            text: 'Dashboard', 
            subOptions: [
                {
                    title: 'Overview', 
                    href: '/dashboard'
                }
            ] 
        },
        { 
            icon: <FaUser className="w-6 h-6" />, 
            text: 'Security', 
            subOptions: [
                {
                    title: 'User Management', 
                    href: '/users'
                }, 
                {
                    title: 'Audit',
                    href: '/users'
                }
            ] 
        },
        { 
            icon: <FaUser className="w-6 h-6" />, 
            text: 'Loan Management', 
            subOptions: [
                {
                    title: 'Borrower Management', 
                    href: '/borrowers'
                }, 
                {
                    title: 'Loan Management',
                    href: '/loans'
                }, 
                {
                    title: 'Account Management', 
                    href: '/account'
                }
            ] 
        },
        { 
            icon: <FaCog className="w-6 h-6" />, 
            text: 'Settings', 
            subOptions: [
                {
                    title: 'General', 
                    href: '/borrowers'
                }, 
                {
                    title: 'Profile',
                    href: '/loans'
                },
            ] 
        },
        { 
            icon: <FaChartBar className="w-6 h-6" />, 
            text: 'Analytics', 
            href: '/'
        },
        { 
            icon: <FaFile className="w-6 h-6" />, 
            text: 'Documents', 
            href: '/'
        },
    ];

    return (
        <div
            className={`${isMenuCollapsed ? 'w-16' : 'w-80'
                } min-h-screen bg-primary text-white transition-all ease-in-out duration-300`}
        >
            <div className="flex items-center justify-center h-[60px]">
                <span className="text-xl font-bold">TKP</span>
            </div>
            <button
                className="w-full py-2 bg-gray-700 text-white border-none cursor-pointer"
                onClick={toggleMenu}
            >
                {isMenuCollapsed ? 'Expand' : 'Collapse'}
            </button>
            <nav className="py-4">
                <ul>
                    {mainOptions.map((option, index) => (
                        <li key={index} onClick={() => handleMainOptionClick(option.text)}>
                            {option.subOptions ? <>
                                <div className={`menu-item flex items-center p-[20px] ${activeMainOption === option.text ? ' bg-secondary' : ''}`}>
                                    {option.icon}
                                    <span className="ml-2">{option.text}</span>
                                </div>
                                {activeMainOption === option.text && option.subOptions && (
                                    <SubMenu subOptions={option.subOptions} onSubOptionClick={handleSubOptionClick} />
                                )}  </> : <a href={option.href}>
                                    <div className={`menu-item flex items-center p-[20px] ${activeMainOption === option.text ? ' bg-secondary' : ''}`}>
                                        {option.icon}
                                        <span className="ml-2">{option.text}</span>
                                    </div>
                                </a> } 
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SideMenu;
