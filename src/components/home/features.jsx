import React from "react";
import { FaFileInvoice, FaUsers, FaCreditCard, FaChartPie, FaBell, FaCogs } from "react-icons/fa";

const FeaturesSection = () => {
    const features = [
        {
            icon: <FaFileInvoice className="text-blue-500 text-4xl mb-4" />,
            title: "Invoice Management",
            description: "Easily create, send, and track your invoices.",
        },
        {
            icon: <FaUsers className="text-green-500 text-4xl mb-4" />,
            title: "Client Database",
            description: "Safely store and organize client information in one place.",
        },
        {
            icon: <FaCreditCard className="text-purple-500 text-4xl mb-4" />,
            title: "Payment Options",
            description: "Accept payments via bank transfer, credit card, and more.",
        },
        {
            icon: <FaChartPie className="text-yellow-500 text-4xl mb-4" />,
            title: "Financial Reports",
            description: "Generate detailed financial reports to analyze your business.",
        },
        {
            icon: <FaBell className="text-red-500 text-4xl mb-4" />,
            title: "Automatic Notifications",
            description: "Receive alerts about pending payments or low stock.",
        },
        {
            icon: <FaCogs className="text-teal-500 text-4xl mb-4" />,
            title: "Intuitive Interface",
            description: "Designed to be easy to use, even for beginners.",
        },
    ];

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10">
                    System Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all"
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
