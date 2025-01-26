import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-20 bg-white shadow-md px-4 md:px-8'>
            <div
                onClick={() => navigate('/')}
                className='flex items-center cursor-pointer'>
                <img 
                    src={logo} 
                    className='h-28 w-28 object-contain' 
                    alt='Logo' 
                />
            </div>
            <div className='flex items-center space-x-4'>
                <button 
                    onClick={() => navigate('/login')}
                    className='px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors'
                >
                    Login
                </button>
                <button 
                    onClick={() => navigate('/signup')}
                    className='px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors'
                >
                    Sign Up
                </button>
            </div>
        </nav>
    )
}