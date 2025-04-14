import { createContext, useState, useContext, useEffect } from "react";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const backendUrl = "http://localhost:3000"; // URL del backend

    // Solicitar la lista de clientes al montar el contexto
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const user_id = window.localStorage.getItem("user_id");
                const res = await fetch(`${backendUrl}/api/getclients/${user_id}`);
                const data = await res.json();
                setClientes(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients();
    }, []);

    return (
        <ClientContext.Provider value={{ clientes, setClientes }}>
            {children}
        </ClientContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useClientContext = () => useContext(ClientContext);
