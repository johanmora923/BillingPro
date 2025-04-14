import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { useNotifications } from "../context/notificationsProvider";
import { BsSun, BsMoon } from "react-icons/bs";

const navItems = [
    { label: "Billing", href: "/panel", icon: "md-inbox" },
    { label: "Inventory", href: "/inventory", icon: "md-star" },
    { label: "Sales Statistics", href: "/statics", icon: "md-send" },
    { label: "Drafts", href: "#", icon: "md-drafts" },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const nameUser = localStorage.getItem("name_user");
    const { showNotifications, setShowNotifications } = useNotifications();


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                {/* Header */}
                <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 pt-6 pb-2">
                    <IoIosNotifications
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-gray-200 transition"
                    />
                    <div className="flex items-center mt-8">
                        <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53474/atom_profile_01.jpg"
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold">{nameUser}</h2>
                            <p className="text-sm text-gray-200">Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow px-6 py-4 space-y-2 overflow-y-auto">
                    {navItems.map(({ label, href, icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors hover:bg-blue-100 group"
                        >
                            <i className={`text-lg ${icon} group-hover:scale-110 transition-transform`} />
                            <span>{label}</span>
                        </a>
                    ))}

                    <hr className="my-4 border-gray-300" />

                    <a
                        href="/help"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors hover:bg-blue-100"
                    >
                        <FaQuestion className="text-lg" />
                        <span>Help</span>
                    </a>
                    <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors hover:bg-blue-100"
                    >
                        <IoMdSettings className="text-lg" />
                        <span>Settings</span>
                    </a>
                </nav>

                {/* Logout */}
                <div className="px-6 py-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-start w-full gap-3 px-4 py-3 text-red-600 hover:text-red-700 font-medium rounded-lg transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        <TbLogout2 className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition lg:hidden"
                aria-label="Toggle Sidebar"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
                </svg>
            </button>
        </>
    );
};

export default Sidebar;
