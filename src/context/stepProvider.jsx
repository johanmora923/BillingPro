import { createContext, useState, useContext } from "react";

const StepContext = createContext();

export const StepProvider = ({ children }) => {
    const [step, setStep] = useState(1);

    return (
        <StepContext.Provider value={{ step, setStep }}>
            {children}
        </StepContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useStepContext = () => useContext(StepContext);
