import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Branding */}
                <div className="flex flex-col items-center text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">BillingPro</h2>
                    <p className="text-sm text-gray-400">
                        Simplifying billing, one invoice at a time.
                    </p>
                </div>

                {/* Divisiones principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-8">
                    {/* Navegación */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="text-gray-400 hover:text-white transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-white transition">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-white transition">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#testimonials" className="text-gray-400 hover:text-white transition">
                                    Testimonials
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Enlaces legales */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#terms" className="text-gray-400 hover:text-white transition">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-gray-400 hover:text-white transition">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-sm text-gray-400">
                            <a href="mailto:support@billingpro.com" className="hover:text-white transition">
                                support@billingpro.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-400">Caracas, Venezuela</p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                                <FaFacebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm mt-8">
                    &copy; {new Date().getFullYear()} BillingPro. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
