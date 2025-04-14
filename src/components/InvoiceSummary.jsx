import React, { useState } from "react";
import { FaMoneyBillWave, FaCheck, FaClock, FaCreditCard, FaBarcode } from "react-icons/fa";
import { motion } from "framer-motion";

const InvoiceSummary = ({ client, selectedProductos, onGenerateInvoice }) => {
    const [estadoPago, setEstadoPago] = useState("Pendiente");
    const [metodoPago, setMetodoPago] = useState("");

    // Total
    const total = selectedProductos.reduce(
        (sum, p) =>
            sum +
            p.precio_venta * p.cantidad -
            p.precio_venta * p.cantidad * (p.descuento / 100),
        0
    );

    // Formatear la fecha a "YYYY-MM-DD HH:mm:ss"
    const getFechaFormateada = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Handlers
    const handleEstadoPagoChange = (e) => setEstadoPago(e.target.value);
    const handleMetodoPagoChange = (e) => setMetodoPago(e.target.value);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-4xl mx-auto"
        >
            {/* Cliente */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Resumen de Factura</h2>
                <p className="text-gray-600 mt-2">
                    <strong>Cliente:</strong> {client?.cliente?.nombre || "Sin nombre"}
                </p>
            </div>

            {/* Productos */}
            <ul className="divide-y divide-gray-200 mb-6">
                {selectedProductos.map((producto) => (
                    <li
                        key={producto.id}
                        className="py-4 px-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-gray-50 rounded-md hover:shadow transition duration-200"
                    >
                        <span className="font-medium text-gray-800">{producto.nombre}</span>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <FaCheck className="text-green-500" />
                                Cantidad: {producto.cantidad}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaMoneyBillWave className="text-blue-500" />
                                Precio: ${producto.precio_venta.toFixed(2)}
                            </span>
                            {producto.descuento > 0 && (
                                <span className="text-red-500">-{producto.descuento}%</span>
                            )}
                            {producto.codigo_barra && (
                                <span className="flex items-center gap-1 text-gray-500">
                                    <FaBarcode /> {producto.codigo_barra}
                                </span>
                            )}
                            <span className="text-green-600 font-semibold">
                                Total: $
                                {(
                                    producto.precio_venta * producto.cantidad -
                                    producto.precio_venta * producto.cantidad * (producto.descuento / 100)
                                ).toFixed(2)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Total */}
            <div className="text-center mb-6">
                <p className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Incluye impuestos y descuentos</p>
            </div>

            {/* Estado de pago y método */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="estadoPago" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado de Pago
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
                        Método de Pago
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

            {/* Botón */}
            <div className="flex justify-end mt-6">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const fecha = getFechaFormateada();
                        onGenerateInvoice(estadoPago, metodoPago, fecha); // <-- envía la fecha formateada
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-300 font-medium text-sm"
                >
                    Generar Factura
                </motion.button>
            </div>
        </motion.div>
    );
};

export default InvoiceSummary;
