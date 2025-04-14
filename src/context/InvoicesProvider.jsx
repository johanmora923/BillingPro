import { createContext, useState, useContext, useEffect } from "react";

const InvoiceHistoryContext = createContext();

export const InvoiceHistoryProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const backendUrl = "http://localhost:3000"; // URL del backend

    // Solicitar el historial de facturas al montar el contexto
    useEffect(() => {
        const fetchInvoiceHistory = async () => {
            try {
                const user_id = window.localStorage.getItem("user_id");
                const res = await fetch(`${backendUrl}/api/getInvoces/${user_id}`);
                const data = await res.json();
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching invoice history:", error);
            }
        };

        fetchInvoiceHistory();
    }, []);

    return (
        <InvoiceHistoryContext.Provider value={{ invoices, setInvoices }}>
            {children}
        </InvoiceHistoryContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useInvoiceHistoryContext = () => useContext(InvoiceHistoryContext);
