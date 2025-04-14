import React, { useState, useMemo } from "react";
import { useInvoiceHistoryContext } from "../context/InvoicesProvider";
import { MdNotificationImportant, MdSearch } from "react-icons/md";
import FacturaSeguimiento from "./facturaseguimiento";
import { motion } from "framer-motion";

const InvoiceHistory = () => {
    const { invoices } = useInvoiceHistoryContext();
    const [expandedInvoice, setExpandedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const convertirFecha = (fechaUTC) => {
        const fecha = new Date(fechaUTC);
        return fecha.toLocaleDateString("es-VE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const fechaStr = convertirFecha(invoice.fecha);
            return (
                invoice.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fechaStr.includes(searchTerm)
            );
        });
    }, [searchTerm, invoices]);

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    const currentInvoices = filteredInvoices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 max-w-6xl mx-auto px-4"
            >
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
                <h3 className="text-2xl font-bold text-gray-900">Invoice History</h3>
                <div className="relative w-full sm:w-72">
                <input
                    type="text"
                    placeholder="Search by customer or date"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-lg" />
                </div>
            </div>
        
            {invoices.length === 0 ? (
                <p className="text-gray-600 text-center text-sm">No invoices have been generated.</p>
            ) : filteredInvoices.length === 0 ? (
                <p className="text-center text-gray-500">No invoices found with that criteria.</p>
            ) : (
                <>
                <ul className="space-y-4">
                    {currentInvoices.map((invoice, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        <div
                        onClick={() =>
                            setExpandedInvoice(
                            expandedInvoice === invoice.factura_id ? null : invoice.factura_id
                            )
                        }
                        className="cursor-pointer hover:bg-gray-50 transition-all p-3 rounded-md"
                        >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                            <p>
                            <strong className="text-gray-700">Customer:</strong>{" "}
                            <span className="text-gray-600">{invoice.cliente_nombre}</span>
                            </p>
                            <p>
                            <strong className="text-gray-700">Total:</strong>{" "}
                            <span className="text-gray-600">${invoice.total}</span>
                            </p>
                            <p>
                            <strong className="text-gray-700">Date:</strong>{" "}
                            <span className="text-gray-600">{convertirFecha(invoice.fecha)}</span>
                            </p>
                            <p>
                            <strong className="text-gray-700">Status:</strong>{" "}
                            <span
                                className={`font-semibold ${
                                invoice.estado === "Pagada"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                            >
                                {invoice.estado === "Pagada" ? "Paid" : "Pending"}
                            </span>
                            </p>
                            <p>
                            <strong className="text-gray-700">Payment Method:</strong>{" "}
                            <span className="text-gray-600">{invoice.metodo_pago}</span>
                            </p>
                        </div>
                        </div>
                        {expandedInvoice === invoice.factura_id && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                        >
                            <FacturaSeguimiento factura={invoice} />
                        </motion.div>
                        )}
                    </li>
                    ))}
                </ul>
        
                {/* Pagination */}
                <div className="flex justify-between items-center mt-6 text-sm">
                    <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    Previous
                    </button>
                    <span className="text-gray-500">
                    Page {currentPage} of {totalPages}
                    </span>
                    <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    Next
                    </button>
                </div>
        
                <div className="flex justify-center mt-6">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                    <MdNotificationImportant className="text-gray-600 text-lg" />
                    Only invoices from the past few months are displayed.
                    </span>
                </div>
                </>
            )}
            </motion.div>
        );
};

export default InvoiceHistory;
