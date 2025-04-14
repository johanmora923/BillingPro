import React, { useState } from "react";
import { useStepContext } from "../context/stepProvider";
import { FaMoneyBill, FaCreditCard, FaClock, FaCheck, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const FacturaSeguimiento = ({ factura, onUpdate }) => {
    const [estadoPago, setEstadoPago] = useState(factura.estado || "Pendiente");
    const [metodoPago, setMetodoPago] = useState(factura.metodo_pago || "");
    const { setStep } = useStepContext();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const convertirFecha = (fechaUTC) => {
        const fecha = new Date(fechaUTC);
        return fecha.toLocaleString("es-VE", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    };

    const fechaFormateada = convertirFecha(factura.fecha);

    const handleEstadoPagoChange = (e) => setEstadoPago(e.target.value);
    const handleMetodoPagoChange = (e) => setMetodoPago(e.target.value);

    const handleGuardarCambios = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/updateInvoice`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    facturaId: factura.factura_id,
                    estadoPago,
                    metodoPago,
                }),
            });

            if (!response.ok) throw new Error("Error al actualizar la factura");

            setStep(1);
            if (onUpdate) {
                onUpdate({ ...factura, estadoPago, metodoPago });
            }
        } catch (error) {
            console.error("Error al guardar cambios:", error.message);
            alert("No se pudo actualizar la factura.");
        }
    };

    const handleDownloadPDF = () => {
        const link = document.createElement("a");
        link.href = factura.pdfUrl;
        link.download = `factura_${factura.cliente_nombre || "sin_nombre"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-100"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">📄 Seguimiento de Factura</h2>

            <div className="grid gap-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">👤 Cliente:</span>
                    <span className="text-gray-800">{factura.cliente_nombre}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">💰 Total:</span>
                    <span className="text-green-700 font-semibold">${factura.total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">🕒 Fecha:</span>
                    <span className="text-gray-700">{fechaFormateada}</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="estadoPago" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado de Pago:
                    </label>
                    <div className="relative">
                        <select
                            id="estadoPago"
                            value={estadoPago}
                            onChange={handleEstadoPagoChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring focus:ring-blue-300 focus:border-blue-500 appearance-none"
                        >
                            <option value="Pendiente">⏳ Pendiente</option>
                            <option value="Pagada">✅ Pagada</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            {estadoPago === "Pendiente" ? <FaClock /> : <FaCheck />}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-1">
                        Método de Pago:
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="metodoPago"
                            value={metodoPago}
                            onChange={handleMetodoPagoChange}
                            placeholder="Ej: Efectivo, Transferencia"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring focus:ring-blue-300 focus:border-blue-500"
                        />
                        <FaCreditCard className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow transition-all"
                >
                    <FaDownload /> Descargar Factura
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGuardarCambios}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow transition-all"
                >
                    <FaCheck /> Guardar Cambios
                </motion.button>
            </div>
        </motion.div>
    );
};

export default FacturaSeguimiento;
