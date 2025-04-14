import React, {  useState } from "react";
import SearchBar from "./SearchBar";
import ClientList from "./ClientList";
import ProductSelection from "./ProductSelection";
import InvoiceSummary from "./InvoiceSummary";
import InvoiceHistory from "./InvoiceHistory";
import Modal from "./modal";
import ConfirmationModal from "./confirm";
import { FaWindows } from "react-icons/fa";
import FacturaSeguimiento from "./facturaseguimiento";
import { useProductContext } from "../context/productsContext";
import { useClientContext } from "../context/clientProvider";
import { useFollowInvoicesContext } from "../context/invoicesFollowProvider";
import { useStepContext } from "../context/stepProvider";
import { toast } from "sonner"; // Importamos la librería de notificaciones


const Facturacion = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // URL del backend
    const { step, setStep } = useStepContext(); // Control del paso actual
    const [search, setSearch] = useState(""); // Barra de búsqueda
    const { clientes, setClientes } = useClientContext()
    const [selectedCliente, setSelectedCliente] = useState(null); // Cliente seleccionado
    const { products }= useProductContext(); // Lista de productos
    const [selectedProductos, setSelectedProductos] = useState([]); // Productos seleccionados
    const { followInvoices, setFollowInvoices } = useFollowInvoicesContext()
    const [facturas, setFacturas] = useState([]); // Historial de facturas
    const [showInfo, setShowInfo] = useState(false); // Mostrar información del cliente
    const [clientInfo, setClientInfo] = useState(null); // Información del cliente
    const [isOpenConfirm, setIsOpenConfirm] = useState(false); // Modal de confirmación
    const [idClient, setIdClient] = useState(null); // ID del cliente para eliminar

    

    console.log(facturas)
    
    const handleSearchChange = (event) => setSearch(event.target.value);

    const handleClienteSelect = (cliente, id) => {
        setSelectedCliente({cliente, id});
        setStep(2); // Avanzar al paso 2
    };
    

    const editClient = () => alert("Edit client functionality not implemented yet!");

    const deleteClient = async (id) => {
    if (!id) {
        console.error("Error deleting client: No client ID provided.");
        toast.error("Failed to delete client: No ID provided."); // Notificación de error si no hay ID
        return;
    }

    // Usamos `toast.promise` para manejar los estados de la operación
    toast.promise(
        fetch(`${backendUrl}/api/deleteclient/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    // Usamos el estado `clientes` directamente como en tu código original
                    setClientes(clientes.filter((cliente) => cliente.id !== id));
                    setIsOpenConfirm(false); // Cerrar el modal de confirmación
                    return "Client deleted successfully!"; // Resolución exitosa
                } else {
                    throw new Error(`Failed to delete client: ${res.statusText}`); // Lanzar error si no es exitoso
                }
            })
            .catch((error) => {
                console.error("Error deleting client:", error);
                throw error; // Rechazo en caso de error
            }),
        {
            loading: "Deleting client...", // Mensaje mientras se ejecuta la operación
            success: (message) => message, // Mensaje dinámico al completarse con éxito
            error: (err) => `Error deleting client: ${err.message}`, // Mensaje dinámico si ocurre un error
        }
    );
};

    

    const handleInfoClient = (id) => {
        setClientInfo(id);
        setShowInfo(!showInfo);
    };

    const handleProductoSelect = (producto) => {
        setSelectedProductos((prevProductos) => {
            const productoExistente = prevProductos.find((p) => p.id === producto.id);
            console.log(producto)
            if (productoExistente) return prevProductos;
            return [
                ...prevProductos,
                { id: producto.id, nombre: producto.nombre, precio_venta: Number(producto.precio_venta) || 0, cantidad: 1 , descuento: producto.descuento || 0},
            ];
        });
    };

    const handleProductoRemove = (productoId) => {
        setSelectedProductos(selectedProductos.filter((p) => p.id !== productoId));
    };

    const handleSubmitFactura = (estado, metodoPago, fecha) => {
        const nuevaFactura = {
            userId: window.localStorage.getItem("user_id"),
            clienteNombre: selectedCliente.cliente,
            clienteId: selectedCliente.id,
            estado: estado,
            metodoPago: metodoPago,
            productos: selectedProductos.map((p) => ({
                id: p.id,
                nombre: p.nombre,
                cantidad: p.cantidad,
                precio_unitario: p.precio_venta,
                descuento: p.descuento,
                subtotal: p.precio_venta * p.cantidad - (p.precio_venta * p.cantidad * (p.descuento / 100)),
                codigo_barra: p.codigo_barra,

            })),
            total: selectedProductos.reduce(
                (sum, p) => sum + p.precio_venta * p.cantidad - (p.precio_venta * p.cantidad * (p.descuento / 100)),
                0
            ),
            fecha: fecha,
        };
    
        // Usamos `toast.promise` para manejar las solicitudes al backend
        toast.promise(
            fetch(`${backendUrl}/api/updateStock`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productos: nuevaFactura.productos.map(
                        ({ id, cantidad }) => ({ id, cantidad })
                    ),
                }),
            })
                .then((updateStockRes) => {
                    if (!updateStockRes.ok) {
                        throw new Error("Error updating stock.");
                    }
                    return fetch(`${backendUrl}/api/saveInvoice`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(nuevaFactura),
                    });
                })
                .then((saveInvoiceRes) => {
                    if (!saveInvoiceRes.ok) {
                        throw new Error("Error saving invoice.");
                    }
                    return saveInvoiceRes.blob();
                })
                .then(async (blob) => {
                    const pdfUrl = window.URL.createObjectURL(blob);
                    const id_client = selectedCliente.id;
                    return await fetch(`${backendUrl}/api/followInvoice/${id_client}`, {
                        method: "GET",
                    }).then((res) =>
                        res.json().then((data) => {
                            setFollowInvoices(data);
                            setStep(4);
                            setFacturas((prevFacturas) => [
                                ...prevFacturas,
                                { ...nuevaFactura, pdfUrl },
                            ]);
                            return "Invoice processed successfully!";
                        })
                    );
                })
                .catch((error) => {
                    console.error("Error processing invoice:", error);
                    throw error;
                }),
            {
                loading: "Processing invoice...", // Mensaje mientras se ejecuta la operación
                success: (message) => message, // Mensaje dinámico al completarse con éxito
                error: (err) => `Error processing invoice: ${err.message}`, // Mensaje dinámico si ocurre un error
            }
        );
    };
    
    
    const updateFacturaInState = (updatedFactura) => {
        setFacturas((prevFacturas) => 
            prevFacturas.map((factura) =>
                factura.id === updatedFactura.id ? updatedFactura : factura
            )
        );
    };
    

    const handleUpdateProductQuantity = (productoId, nuevaCantidad) => {
        setSelectedProductos((prevProductos) =>
            prevProductos.map((producto) =>
                producto.id === productoId ? { ...producto, cantidad: nuevaCantidad } : producto
            )
        );
    };

    const showInvoiceFollow = async (idInvoice) =>{
        if (!idInvoice){
            console.log('problems reviewing the invoice')
        }
        try{ 
            const res = await fetch(`${backendUrl}/api/invoicesFollow/${idInvoice}`)
            const data = res.json()
            setFollowInvoices(data)
            setStep(4)
        }
        catch(error){
            console.error('Error reviewing the invoice', error)
        }
    }
    

    const handleBack = () => setStep((prevStep) => prevStep - 1);

    return (
        <div className=" lg:ml-68 p-2 lg:pl-6 bg-gray-100 min-h-screen transition-all ease-in-out">
            {/* Botón de regreso */}
            <div className="fixed top-6 z-50 ml-[4%]">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-700 bg-white py-2 px-4 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                >
                    ⬅ Back
                </button>
            </div>
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase tracking-wider">
                    Billing
                </h2>

                {/* Barra de búsqueda (condicional) */}
                {step !== 3 && (
                    <SearchBar
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={step === 1 ? "Search client..." : "Search product..."}
                        className="mb-6"
                    />
                )}

                {/* Renderizado condicional basado en los pasos */}
                {step === 1 && (
                    <div>
                        <ClientList
                            search={search}
                            onSelectClient={handleClienteSelect}
                            onEditClient={editClient}
                            onDeleteClient={(id) => {
                                setIdClient(id);
                                setIsOpenConfirm(true);
                            }}
                            onToggleInfo={handleInfoClient}
                            clientInfo={clientInfo}
                            showInfo={showInfo}
                        />
                        <ConfirmationModal
                            isOpen={isOpenConfirm}
                            onClose={() => setIsOpenConfirm(false)}
                            onConfirm={() => deleteClient(idClient)}
                            title="Confirmation"
                            message="Are you sure you want to delete this client?"
                        />
                    </div>
                )}
                {step === 2 && (
                    <ProductSelection
                        products={products}
                        search={search}
                        selectedProductos={selectedProductos}
                        onSelectProduct={handleProductoSelect}
                        onRemoveProduct={handleProductoRemove}
                        onUpdateProductQuantity={handleUpdateProductQuantity}
                        onContinue={() => setStep(3)}
                    />
                )}
                {step === 3 && (
                    <InvoiceSummary
                        client={selectedCliente}
                        selectedProductos={selectedProductos}
                        onGenerateInvoice={(estado, metodoPago, fecha) => {
                            handleSubmitFactura(estado, metodoPago, fecha );
                        }}
                    />
                )}
                {step === 4 && (
                    <FacturaSeguimiento
                        factura={followInvoices}
                        onUpdate={(updatedFactura) => updateFacturaInState(updatedFactura)}
                    />
                )}
                <InvoiceHistory
                    showInvoiceFollow={(idInvoice) => showInvoiceFollow(idInvoice)}
                />
            </div>
        </div>

    );
};

export default Facturacion;
