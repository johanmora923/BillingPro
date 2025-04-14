import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Contenedor del modal */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* Título del modal */}
            <div className=" px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>

            {/* Mensaje */}
            <div className="p-6">
            <p className="text-gray-700">{message}</p>
            </div>

            {/* Botones de acción */}
            <div className=" px-6 py-4 flex justify-end space-x-3">
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
            >
                Cancel
            </button>
            <button
                onClick={onConfirm}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
                Confirm
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmationModal;
