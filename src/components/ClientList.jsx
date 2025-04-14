import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaChevronDown, FaUserPlus, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Modal from "./modal";
import { useClientContext } from "../context/clientProvider";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ClientList = ({
    search,
    onSelectClient,
    onEditClient,
    onDeleteClient,
    onToggleInfo,
    clientInfo,
    showInfo,
}) => {
    const backendUrl = 'http://localhost:3000';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clientes } = useClientContext();
    const user_id = localStorage.getItem("user_id");

    const handleAddClient = (formData) => {
        if (!formData) {
            console.error("Error adding client: No form data provided");
            toast.error("Failed to add client: No data provided.");
            return;
        }

        toast.promise(
            fetch(`${backendUrl}/api/addclient/${user_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    return response.json().then((data) => {
                        if (response.ok) {
                            console.log("Client added successfully:", data);
                            window.location.reload();
                            return "Client added successfully!";
                        } else {
                            console.error(`Error adding client: ${data.message || "Unknown error"}`, data);
                            throw new Error(`Failed to add client: ${data.message || "Unknown error"}`);
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error adding client: Failed to fetch", error);
                    throw error;
                }),
            {
                loading: "Adding client...",
                success: (message) => message,
                error: (err) => `Error adding client: ${err.message}`,
            }
        );
    };

    return (
        <div className="space-y-4">
            <Modal
                title="Add Client"
                fields={[
                    { label: "Name", type: "text", required: true, icon: <FaUser /> },
                    { label: "Email", type: "email", required: false, icon: <FaEnvelope /> },
                    { label: "Phone", type: "number", required: true, icon: <FaPhoneAlt /> },
                    { label: "Address", type: "text", required: false, icon: <FaMapMarkerAlt /> },
                ]}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddClient}
            />

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-blue-600" /> Clients
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400 transition"
                >
                    <FaUserPlus /> Add Client
                </button>
            </div>

            <ul className="space-y-3">
                {clientes
                    .filter((cliente) =>
                        cliente.nombre.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((cliente) => (
                        <motion.li
                            key={cliente.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => onSelectClient(cliente, cliente.id)}
                                    className="flex-grow text-left text-gray-800 hover:text-gray-900 focus:outline-none"
                                >
                                    <span className="font-medium flex items-center gap-2">
                                        <FaUser className="text-blue-500" /> {cliente.nombre}
                                    </span>
                                </button>
                                <div className="flex space-x-3">
                                    <FaEdit
                                        onClick={onEditClient}
                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                    />
                                    <FaTrashAlt
                                        onClick={() => onDeleteClient(cliente.id)}
                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                    />
                                    <FaChevronDown
                                        onClick={() => onToggleInfo(cliente.id)}
                                        className="cursor-pointer text-gray-600 hover:text-gray-800"
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {showInfo && clientInfo === cliente.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-4 py-3 bg-gray-50 rounded-md shadow-inner mt-1 overflow-hidden"
                                    >
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p><strong>Name:</strong> {cliente.nombre}</p>
                                            <p><strong>ID:</strong> {cliente.id}</p>
                                            <p><strong>Email:</strong> {cliente.email}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    ))}
            </ul>
        </div>
    );
};

export default ClientList;