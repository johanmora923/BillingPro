import React, { useState, useEffect } from "react";
import Modal from "./modal";
import ConfirmationModal from "./confirm";
import InventoryStockUpdater from "./addstock";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useProductContext } from "../context/productsContext";

const InventoryComponent = () => {
    const backendUrl = "http://localhost:3000"; // URL del backend
    const {products, setProducts, filteredProducts, setFilteredProducts} = useProductContext()
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
    const [searchQuery, setSearchQuery] = useState(""); // Query de búsqueda
    const [editProduct, setEditProduct] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [idProduct, setIdProduct] = useState()

    const [productForm, setProductForm] = useState({
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        discount: "",
        details: "",
        category: "",
        unitMeasure: "",
        barcode: "",
        status: "activo",
        user_id: window.localStorage.getItem('user_id')
    });


    // Filtrar productos en tiempo real
    useEffect(() => {
        const filtered = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products,]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    useEffect(() =>{
            const deleteProduct = (Id) => {
                try{
                    if(confirm){
                    const res = fetch(`${backendUrl}/api/deleteproduct/${Id}`, {
                        method: 'DELETE',
                    });
                    setConfirm(false);
                    setIsOpenConfirm(false);
                    window.location.reload();
                    if(res.ok){
                        setProducts(products.filter((product) => product.id !== Id));
                    }
                }}
                catch(error){
                    console.log(error);
                }
            };
            deleteProduct(idProduct)
        }, [confirm,products,idProduct])

    const handleAddProduct = async () => {
        if (
        !productForm.name ||
        !productForm.purchasePrice ||
        !productForm.sellingPrice ||
        !productForm.stock ||
        !productForm.category 
        ) {
        alert("Please fill in all required fields.");
        return;
        }

        try {
        const res = await fetch(`${backendUrl}/api/addproduct`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(productForm),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct]);
            setFilteredProducts([...products, newProduct]);
            setIsModalOpen(false);
            setProductForm({
            name: "",
            purchasePrice: "",
            sellingPrice: "",
            stock: "",
            discount: "",
            details: "",
            category: "",
            unitMeasure: "",
            barcode: "",
            status: "activo",
            });
            window.location.reload()
        } else {
            console.error("Error adding product:", res.statusText);
        }
        } catch (error) {
        console.error("Error adding product:", error);
        }
    };

    const handleUpdateProduct = async (formData, Id) =>{
        try {
            const response = await fetch(`${backendUrl}/api/updateproduct/${Id}`, {
                method: "PUT", // Utilizamos PUT para actualizar el producto
                headers: {
                    "Content-Type": "application/json", // Aseguramos que los datos estén en formato JSON
                },
                body: JSON.stringify(formData) // Convertimos formData a JSON para enviarlo
                });
                // Verificar si la solicitud fue exitosa
                if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
            
                // Procesar la respuesta del servidor
                const updatedProduct = await response.json();
                console.log("Product successfully updated:", updatedProduct);
                
                return updatedProduct; // Devuelve el producto actualizado para su manejo en el frontend
            } catch (error) {
                console.error("Error updating product in backend:", error.message);
            }
    }

    return (
        <div className="lg:ml-64 p-3 lg:p-2 lg:pl-6 bg-gradient-to-r from-green-50 via-blue-50 to-indigo-50 min-h-screen transition-all ease-in-out">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-800">
            Inventory Management
            </h2>

            {/* Cuadros de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-100 rounded-lg p-4 shadow">
                    <h3 className="text-lg font-semibold text-blue-900">Total Products</h3>
                    <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4 shadow">
                    <h3 className="text-lg font-semibold text-green-900">Total Stock</h3>
                    <p className="text-3xl font-bold">
                    {products.reduce((sum, product) => sum + product.existencias, 0)}
                    </p>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 shadow">
                    <h3 className="text-lg font-semibold text-indigo-900">Potential Revenue</h3>
                    <p className="text-3xl font-bold">
                    $
                    {products
                        .reduce(
                        (sum, product) =>
                            sum + product.precio_venta * product.existencias,
                        0
                        )
                        }
                    </p>
                </div>
            </div>
            {/* Barra de búsqueda */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 text-lg border-2 border-indigo-400 rounded-lg bg-gradient-to-r from-white to-indigo-50 shadow-md focus:ring focus:ring-indigo-500 focus:outline-none transition-all duration-200 ease-in-out"
                />
            </div>

        {/* Botón para abrir el modal */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                    + Add Product
                </button>
            </div>
            {/* Modal */}
            {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 overflow-y-auto max-h-[90vh]">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Product</h2>
                    <form className="space-y-4">
                        {/* Input: Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={productForm.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="e.g., Laptop"
                                required
                            />
                        </div>

                        {/* Input: Category */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category *
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={productForm.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., Electronics"
                            required
                        />
                        </div>

                        {/* Input: Purchase Price */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Purchase Price *
                        </label>
                        <input
                        type="number"
                        name="purchasePrice"
                        value={productForm.purchasePrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="e.g., 500"
                        required
                        />
                        </div>

                        {/* Input: Selling Price */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Selling Price *
                        </label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={productForm.sellingPrice}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., 700"
                            required
                        />
                        </div>

                        {/* Input: Stock */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stock Quantity *
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={productForm.stock}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., 100"
                            required
                        />
                        </div>

                        {/* Input: Discount */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Discount (%)
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={productForm.discount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., 10"
                        />
                        </div>

                        {/* Input: Details */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Details
                        </label>
                        <textarea
                            name="details"
                            value={productForm.details}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Write product details here..."
                        ></textarea>
                        </div>

                        {/* Input: Unit Measure */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Unit Measure *
                        </label>
                        <input
                            type="text"
                            name="unitMeasure"
                            value={productForm.unitMeasure}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., Units, Liters"
                            
                        />
                        </div>

                        {/* Input: Barcode (Optional) */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Barcode
                        </label>
                        <input
                            type="text"
                            name="barcode"
                            value={productForm.barcode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., 1234567890123"
                        />
                        </div>

                        {/* Button: Save Product */}
                        <button
                        type="button"
                        onClick={handleAddProduct}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                        Save Product
                        </button>
                    </form>
                </div>
            </div>
            )}

            {/* Lista de productos */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Product List
                </h3>
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 text-center">No products found.</p>
                ) : (
                    <ul className="space-y-3">
                    {filteredProducts.map((product) => (
                        <li
                        key={product.id}
                        className="flex :flex-col justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                        {/* Información del producto */}
                        <div>
                            <p className="text-lg font-bold text-gray-800">{product.nombre}</p>
                            <p className="text-sm text-gray-600">Category: {product.categoria}</p>
                            <p className="text-sm text-gray-600">Stock: {product.existencias}</p>
                            <p className="text-sm text-gray-600">Selling Price: ${Number(product.precio_venta).toFixed(2)}</p>
                            {product.codigo_barra && (
                            <p className="text-sm text-gray-600">Barcode: {product.codigo_barra}</p>
                            )}
                            <p className="text-sm text-gray-600">
                            Discount: {product.descuento ? `${product.descuento}%` : "No discount"}
                            </p>
                            <p className="text-sm text-gray-600">Status: {product.estado}</p>
                        </div>

                        {/* Acciones del producto */}
                        {editProduct === true &&
                        <Modal
                            title="Edit Product"
                            fields={[
                            { label: "Name", type: "text", required: true, value: product.nombre },
                            { label: "Category", type: "text", required: true},
                            { label: "Stock", type: "number", required: true, content: product.stock },
                            { label: "sellingprice", type: "number", required: true, content: product.stock },
                            { label: "purchaseprice", type: "number", required: true, content: product.precio_venta },
                            { label: "Barcode", type: "text", required: false, content: product.barcode },
                            ]}
                            isOpen={editProduct}
                            onClose={() => setEditProduct(false)}
                            onSubmit={(formData) => handleUpdateProduct(formData, product.id)} // Actualiza el producto
                        />
                        }
                        {isOpenConfirm && 
                            <ConfirmationModal
                            isOpen={isOpenConfirm}
                            onClose={() => setIsOpenConfirm(false)}
                            onConfirm={() => setConfirm(true)}
                            title="Confirmation"
                            message="Are you sure you want to delete this product?"
                        />}
                        <div className="flex flex-col md:flex-row ">
                            <InventoryStockUpdater products={products} setProducts={setProducts} productId={product.id} />
                            <div className="flex mt-5 justify-end md:ml-5 md:mt-20">
                                <FaEdit
                                onClick={() => setEditProduct(true)}
                                className="cursor-pointer text-blue-500 hover:text-blue-700 size-[1.5em] mr-2"
                                >
                                Edit
                                </FaEdit>
                                <FaTrashAlt
                                onClick={() => {
                                    setIsOpenConfirm(true);
                                    setIdProduct(product.id)
                                }}
                                className="cursor-pointer text-red-500 hover:text-red-700 size-[1.5em]"
                                >
                                Delete
                                </FaTrashAlt>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>
        </div>
    );
};

export default InventoryComponent;
