import React from "react";
import { useProductContext } from "../context/productsContext";
import { FaPlus, FaTrashAlt, FaSearch, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductSelection = ({
    search,
    selectedProductos,
    onSelectProduct,
    onRemoveProduct,
    onUpdateProductQuantity,
    onContinue,
    }) => {
    const { products } = useProductContext();

    return (
        <div className="relative p-4">
        {/* Lista de Productos y Seleccionados */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Lista de Productos */}
            <ul className="space-y-4 w-full md:w-1/2">
            {products
                .filter((producto) =>
                producto.nombre.toLowerCase().includes(search.toLowerCase())
                )
                .map((producto) => (
                <motion.li
                    key={producto.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                    onClick={() => onSelectProduct(producto)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                    <div className="flex items-center gap-3 text-gray-800 font-medium">
                        <FaPlus className="text-green-500" />
                        {producto.nombre}
                    </div>
                    <span className="text-gray-600">${producto.precio_venta}</span>
                    </button>
                </motion.li>
                ))}
            </ul>

            {/* Productos Seleccionados */}
            <ul className="space-y-4 w-full md:w-1/2">
            {selectedProductos.map((producto) => (
                <motion.li
                key={producto.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-800">{producto.nombre}</span>
                    <input
                    type="number"
                    min="1"
                    value={producto.cantidad || 1}
                    onChange={(e) =>
                        onUpdateProductQuantity(
                        producto.id,
                        parseInt(e.target.value, 10) || 1
                        )
                    }
                    className="w-20 px-2 py-1 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    aria-label="Cantidad del producto"
                    />
                </div>
                <button
                    onClick={() => onRemoveProduct(producto.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                    <FaTrashAlt />
                </button>
                </motion.li>
            ))}
            </ul>
        </div>

        {/* Botón Continuar */}
        <div className="flex justify-end mt-6">
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring focus:ring-blue-400"
            >
            <FaCheck /> Continue
            </motion.button>
        </div>
        </div>
    );
};

export default ProductSelection;
