import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-blue-600">
                    BillingPro
                </a>

                {/* Navigation Menu (Desktop) */}
                <ul className="hidden lg:flex space-x-6 items-center">
                    <li>
                        <a href="#home" className="text-gray-700 hover:text-blue-500 font-medium transition">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#features" className="text-gray-700 hover:text-blue-500 font-medium transition">
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#pricing" className="text-gray-700 hover:text-blue-500 font-medium transition">
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a href="#testimonials" className="text-gray-700 hover:text-blue-500 font-medium transition">
                            Testimonials
                        </a>
                    </li>
                </ul>

                {/* Highlighted Buttons */}
                <div className="hidden lg:block">
                    <a
                        href="#try"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Try for Free
                    </a>
                    <a
                        href="/login"
                        className="ml-4 px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                    >
                        Login
                    </a>
                </div>

                {/* Mobile Menu */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-gray-700 text-2xl focus:outline-none"
                >
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Dropdown Menu for Mobile */}
            {isMenuOpen && (
                <ul className="lg:hidden bg-white shadow-lg">
                    <li className="border-t border-gray-200">
                        <a
                            href="#home"
                            className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </a>
                    </li>
                    <li className="border-t border-gray-200">
                        <a
                            href="#features"
                            className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                        >
                            Features
                        </a>
                    </li>
                    <li className="border-t border-gray-200">
                        <a
                            href="#pricing"
                            className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                        >
                            Pricing
                        </a>
                    </li>
                    <li className="border-t border-gray-200">
                        <a
                            href="#testimonials"
                            className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                        >
                            Testimonials
                        </a>
                    </li>
                    <li className="border-t border-gray-200">
                        <a
                            href="#try"
                            className="block px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 text-center"
                        >
                            Try for Free
                        </a>
                    </li>
                    <li className="border-t border-gray-200">
                        <a
                            href="#login"
                            className="block px-6 py-4 text-blue-600 border-t border-blue-600 text-center"
                        >
                            Login
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
