import React, { useState } from "react";
import { FaPaypal, FaBitcoin, FaMobileAlt, FaUniversity, FaWallet } from "react-icons/fa";

const PaymentStep = () => {
    const backend = "http://localhost:3000"; // URL base del backend
    const userId = window.localStorage.getItem("id_register"); // ID del usuario almacenado
    const [selectedMethod, setSelectedMethod] = useState(null); // Método de pago seleccionado
    const [isProcessing, setIsProcessing] = useState(false); // Estado para mostrar la carga
    const [errorMessage, setErrorMessage] = useState(""); // Mensajes de error

    const paymentMethods = [
        {
            id: "paypal",
            name: "PayPal",
            description: "Secure payments with your PayPal account.",
            icon: <FaPaypal className="text-blue-600 text-4xl" />,
        },
        {
            id: "binance",
            name: "Binance",
            description: "Pay with cryptocurrency using Binance.",
            icon: <FaBitcoin className="text-yellow-500 text-4xl" />,
        },
        {
            id: "pago_movil",
            name: "Pago Móvil",
            description: "Quick transfers via your bank's Pago Móvil.",
            icon: <FaMobileAlt className="text-green-500 text-4xl" />,
        },
        {
            id: "bank_transfer",
            name: "Bank Transfer",
            description: "Direct payments to our bank account.",
            icon: <FaUniversity className="text-gray-700 text-4xl" />,
        },
        {
            id: "airtm",
            name: "AirTM",
            description: "Fast and secure payments through AirTM.",
            icon: <FaWallet className="text-blue-500 text-4xl" />,
        },
    ];

    // Función para manejar el pago
    const handlePayment = async () => {
        if (!selectedMethod) {
            setErrorMessage("Please select a payment method.");
            return;
        }

        setIsProcessing(true);
        setErrorMessage("");

        const subscriptionData = {
            userId: userId,
            paymentMethod: selectedMethod,
            subscriptionDate: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${backend}/api/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscriptionData),
            });

            if (res.ok) {
                console.log("Subscription registered successfully!");
                // Lógica adicional en caso de éxito
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "Payment registration failed.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred while processing the payment.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-gray-100 py-10 px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Select a Payment Method
            </h2>
            {errorMessage && (
                <div className="mb-4 text-red-600 text-center font-semibold">
                    {errorMessage}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`flex flex-col items-center bg-white p-6 rounded-lg shadow-lg cursor-pointer border-2 ${
                            selectedMethod === method.id
                                ? "border-blue-500"
                                : "border-gray-200"
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                    >
                        <div className="mb-4">{method.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {method.name}
                        </h3>
                        <p className="text-gray-600 text-center">{method.description}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handlePayment}
                    className={`px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow-md hover:shadow-lg transition duration-300 ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Confirm Payment"}
                </button>
            </div>
        </div>
    );
};

export default PaymentStep;
