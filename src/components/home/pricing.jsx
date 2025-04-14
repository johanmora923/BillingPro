import React from "react";
import { usePlan } from "../../context/planProvider";

const PricingSection = () => {
    const { setSelectedPlan } = usePlan(); // Accedemos al contexto para actualizar el plan seleccionado

    const plans = [
        {
            name: "Free",
            price: "Free",
            trial: "No Trial Required",
            features: [
                "Unlimited invoices",
                "Basic client management",
                "Track payments",
                "Ad-supported",
                "Single-user access",
            ],
            popular: false,
        },
        {
            name: "Premium",
            price: "$14.99/month",
            trial: "1 Month Free Trial",
            features: [
                "Ad-free experience",
                "Advanced client management",
                "Custom invoice branding",
                "Detailed financial reports",
                "Up to 3 users",
                "Email support",
            ],
            popular: true,
        },
        {
            name: "Business",
            price: "$39.99/month",
            trial: "1 Month Free Trial",
            features: [
                "All Premium features",
                "Team collaboration tools",
                "Unlimited users",
                "Advanced analytics",
                "Priority 24/7 support",
                "Multi-currency and language support",
            ],
            popular: false,
        },
    ];

    // Función para manejar la selección del plan
    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan); // Actualizamos el contexto
        window.localStorage.setItem("plan", JSON.stringify(plan)); // Guardamos en localStorage
        window.location.href = "/start"; // Redirigimos a la página de suscripción
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12">
                    Choose Your Plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-6 border rounded-lg shadow-lg flex flex-col justify-between ${
                                plan.popular ? "border-blue-500" : "border-gray-200"
                            }`}
                        >
                            {plan.popular && (
                                <p className="text-sm uppercase text-white bg-blue-500 px-3 py-1 rounded-full w-max mx-auto mb-4">
                                    Most Popular
                                </p>
                            )}
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                    {plan.name}
                                </h3>
                                <p className="text-3xl font-bold text-gray-800 mb-2">
                                    {plan.price}
                                </p>
                                <p className="text-sm text-gray-500 italic mb-6">
                                    {plan.trial}
                                </p>
                                <ul className="text-left space-y-2 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="text-gray-600 flex items-center space-x-2"
                                        >
                                            <span className="text-blue-500">✔</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto">
                                <button
                                    onClick={() => handleSelectPlan(plan)} // Lógica correcta aquí
                                    className={`block w-full px-6 py-3 rounded-lg text-white font-bold ${
                                        plan.popular
                                            ? "bg-blue-500 hover:bg-blue-600"
                                            : "bg-gray-500 hover:bg-gray-600"
                                    }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
