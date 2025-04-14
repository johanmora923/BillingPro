import React, { useState, useEffect } from "react";
import { Register } from "./register";
import { usePlan } from "../context/planProvider";
import PaymentStep from "./paysubs";

const SubscriptionFlow = () => {
    const [step, setStep] = useState(1);
    const [user  ,setUser] = useState(null); 
    const { selectedPlan, setSelectedPlan } = usePlan();

    // Cargar el plan desde localStorage solo una vez al montar
    useEffect(() => {
        const planFromStorage = JSON.parse(window.localStorage.getItem("plan"));
        if (planFromStorage) {
            setSelectedPlan(planFromStorage);
        }
    }, [setSelectedPlan]);

    const goToNextStep = () => setStep(step + 1);



    // Verifica que el plan esté definido
    if (!selectedPlan) {
        return <p>Please select a plan to continue.</p>;
    }

    return (
        <div className="bg-gray-50  max-w-3xl mx-auto">
            {/* Step 1: Welcome & Plan Details */}
            {step === 1 && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome to {selectedPlan.name} Plan</h2>
                    <p className="mb-6">Enjoy the features of this plan!</p>
                    <ul className="text-left list-disc list-inside mb-6">
                        {selectedPlan.features && selectedPlan.features.map((feature, i) => (
                            <li key={i} className="text-gray-600">{feature}</li>
                        ))}
                    </ul>
                    <button
                        onClick={goToNextStep}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Start Now
                    </button>
                </div>
            )}
            {step === 2 && (
                <Register
                    onLogin={(userData) => {
                        setUser(userData);
                        goToNextStep();
                    }}
                />
            )}
            {step === 3 && (
                selectedPlan.name 
                ===  "Free" ? window.location.href = '/login' :
                <PaymentStep />
            )}
        </div>
    );
};

export default SubscriptionFlow;
