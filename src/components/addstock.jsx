import React, { useState } from "react";
import { toast } from "sonner"; // Usamos la función de promesa de Sonner


const InventoryStockUpdater = ({ products, setProducts, productId }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    ;
    const [updatedStock, setUpdatedStock] = useState({}); // Estado para almacenar los cambios en el stock

    const handleStockChange = (productId, newStock) => {
        setUpdatedStock({ ...updatedStock, [productId]: newStock }); // Actualiza el stock en el estado
    };

    const handleSaveStock = (productId) => {
        // Validar que el stock sea un número positivo
        if (!updatedStock[productId] || updatedStock[productId] <= 0) {
            toast.error("Invalid stock value. Please enter a positive number."); // Notificación de error
            return;
        }

        // Usamos `toast.promise` para manejar la operación asincrónica
        const updateStockPromise = fetch(`${backendUrl}/api/stock/${productId}`, {
            method: "PUT", // Usamos PUT para actualizar el stock
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock: updatedStock[productId] }), // Enviamos el nuevo stock
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((updatedProduct) => {
                // Actualizar el estado de los productos localmente
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === productId ? { ...product, stock: updatedProduct.stock } : product
                    )
                );
                return updatedProduct; // Retornamos el producto actualizado
            });

        // Manejo de la promesa con `toast.promise`
        toast.promise(updateStockPromise, {
            loading: "Updating stock...", // Mensaje mientras se ejecuta la operación
            success: (updatedProduct) =>
                `Stock for ${updatedProduct.name} updated successfully to ${updatedProduct.stock}!`, // Mensaje si tiene éxito
            error: (err) => `Error updating stock: ${err.message}`, // Mensaje si ocurre un error
        });
    };

    return (
        <div className="p-3 bg-gray-50 border rounded-md shadow-sm max-w-md mx-auto">
            <h1 className="text-[#292929] text-center text-sm font-semibold mb-2">
                Update Stock
            </h1>
            <ul className="space-y-3">
                {products.map((product) =>
                    product.id !== productId ? null : (
                        <li key={product.id} className="flex flex-col items-start sm:flex-row sm:justify-between">
                            <div className="w-full sm:w-auto">
                                <input
                                    type="number"
                                    value={updatedStock[product.id] || ""}
                                    onChange={(e) => handleStockChange(product.id, parseInt(e.target.value, 10))}
                                    placeholder="New Stock"
                                    className="w-full sm:w-24 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                onClick={() => handleSaveStock(product.id)}
                                className="mt-2 sm:mt-0 sm:ml-4 bg-blue-500 text-sm text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            >
                                Save
                            </button>
                        </li>
                    )
                )}
            </ul>
        </div>

    );
};

export default InventoryStockUpdater;
