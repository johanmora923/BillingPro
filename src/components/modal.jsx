import React, { useState } from "react";

const Modal = ({ title, fields, onSubmit, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
        acc[field.label.toLowerCase()] = ""; // Inicializa cada campo con un valor vacío
        return acc;
        }, {})
    );

    const handleChange = (label, value) => {
        setFormData({ ...formData, [label.toLowerCase()]: value }); // Actualiza los datos del formulario
    };

    const handleSubmit = () => {
        onSubmit(formData); // Llama a la función onSubmit con los datos del formulario
        onClose(); // Cierra el modal
    };

    if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        {/* Contenedor del modal */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
            {/* Encabezado */}
            <div className="border-b px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>

            {/* Contenido */}
            <div className="p-6">
            <form className="space-y-4">
                {fields.map((field, index) => (
                <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                    </label>
                    <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.label.toLowerCase()]}
                    onChange={(e) =>
                        handleChange(field.label, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder={`Enter ${field.label}`}
                    />
                </div>
                ))}
            </form>
            </div>

            {/* Botones */}
            <div className="border-t px-6 py-4 flex justify-end space-x-3">
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Save
            </button>
            </div>
        </div>
        </div>
    );
};

export default Modal;
