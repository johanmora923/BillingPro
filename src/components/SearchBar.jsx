import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                aria-label="Search bar"
            />
        </div>
    );
};

export default SearchBar;
