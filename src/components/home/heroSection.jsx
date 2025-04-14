import React from "react";
import Navbar from "./nav";

export const HeroSection = () => {
    return (
        <div>
            <Navbar />
            <section className="bg-gray-50 py-30">
                <div className="max-w-6xl mx-auto px-6 lg:flex lg:items-center lg:justify-between">
                    {/* Texto principal */}
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            Simplify Your Billing Process
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Manage invoices, clients, and payments effortlessly with our professional billing system. Tailored for businesses of all sizes.
                        </p>
                        <a
                            href="#pricing"
                            className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                        >
                            Get Started Now
                        </a>
                    </div>

                    {/* Mockup */}
                    <div className="lg:w-1/2 flex justify-center  lg:mt-0">
                        <div className="relative">
                            {/* Laptop Mockup */}
                            <img
                                src="mockups1.png"
                                alt="Mockup Laptop"
                                className="rounded-lg  max-w-full max-h-[85vh] mx-auto"
                            />
                            {/* Mobile Mockup */}
                            <img
                                src="mockups2.png"
                                alt="Mockup Phone"
                                className="absolute -right-10 -bottom-10 w-40 rounded-lg "
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
