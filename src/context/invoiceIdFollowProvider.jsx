import { createContext, useState, useContext } from "react";

const FollowIdInvoicesContext = createContext();

export const FollowIdInvoicesProvider = ({ children }) => {
    const [idInvoice, setIdInvoice] = useState([]);

    return (
        <FollowIdInvoicesContext.Provider value={{ idInvoice, setIdInvoice }}>
            {children}
        </FollowIdInvoicesContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useFollowIdInvoicesContext = () => useContext(FollowIdInvoicesContext);
