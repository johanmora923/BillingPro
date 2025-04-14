import { createContext, useState, useContext } from "react";

const FollowInvoicesContext = createContext();

export const FollowInvoicesProvider = ({ children }) => {
    const [followInvoices, setFollowInvoices] = useState([]);

    return (
        <FollowInvoicesContext.Provider value={{ followInvoices, setFollowInvoices }}>
            {children}
        </FollowInvoicesContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useFollowInvoicesContext = () => useContext(FollowInvoicesContext);
