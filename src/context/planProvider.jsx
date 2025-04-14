import React, { createContext, useState, useContext } from "react";

// Crea el contexto
const PlanContext = createContext();



// Crea el proveedor del contexto
export const PlanProvider = ({ children }) => {
    const [selectedPlan, setSelectedPlan] = useState([]); // Estado del plan seleccionado

    

    return (
        <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
            {children}
        </PlanContext.Provider>
    );
};

// Hook personalizado para acceder al contexto fácilmente
export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan debe usarse dentro de un PlanProvider");
    }
    return context;
};
