import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner"; // Importamos Sonner para manejar las notificaciones
import { useNotificationContext } from "./notification.jsx"; // Importamos el contexto de notificaciones
import { useNotifications } from "./notificationsProvider.jsx";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { notificationsEnabled } = useNotificationContext(); // Obtenemos el estado de las notificaciones
    const { addNotification } = useNotifications(); // Obtenemos la función para agregar notificaciones
    
    console.log("Notifications enabled:", notificationsEnabled);
    // Obtener productos del backend al montar el componente
    useEffect(() => {
        const user_id = window.localStorage.getItem('user_id');
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/products/${user_id}`);
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);

                // Verificar condiciones de stock bajo
                checkLowStock(data); // Llamamos a la función para manejar la lógica de stock bajo
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Función para verificar productos con stock bajo y generar notificaciones
    const checkLowStock = (productList) => {
        console.log(productList)
        const lowStockProducts = productList.filter((product) => product.existencias <= 5);
        
        lowStockProducts.forEach((product) => {
            notificationsEnabled === 'true' ? toast.error(`Low stock alert: ${product.nombre} has only ${product.existencias} units left!`, {
                description: `You should restock ${product.nombre} soon.`,
                style: {
                    backgroundColor: "#fef2f2", // Fondo rojo claro
                    color: "#b91c1c", // Texto rojo oscuro
                },
                duration: 5000,
                icon: "⚠️", // Icono de advertencia,
            }) : null; // Solo mostrar la notificación si está habilitada
            addNotification({
                title: `Low stock alert for ${product.nombre}`,
                description: `Only ${product.existencias} units left.`,
                type: "warning",
                timesTamp: new Date(),
            })
            
        });
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, filteredProducts, setFilteredProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
