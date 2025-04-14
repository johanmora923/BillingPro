import React, { useState } from "react";
import { usePlan } from "../context/planProvider";

export const Register = ({onLogin}) =>{
    const backend = 'http://localhost:3000';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Estado para los errores
    const { selectedPlan } = usePlan()
    console.log(selectedPlan)
    
    const register = async () => {
        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            planName: selectedPlan.name,
            init: new Date().toISOString(), // Fecha actual en formato ISO
            expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() // Un mes después
        };
        
        try {
            const res = await fetch(`${backend}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                console.log('User registered');
                setErrorMessage('');
                const data = await  res.json()
                console.log(data)
                onLogin({ id: data.id , name: data.user});
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || 'Registration failed.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An unexpected error occurred during registration.');
        }
    }
    return(
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-6 bg-gray-200 transition-transform duration-500 ease-in-out">
            {errorMessage && (
                    <div className="absolute top-4 left-1/2 z-51 transform -translate-x-1/2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg">
                        {errorMessage}
                    </div>
                )}
            <h2 className="text-2xl font-bold text-[#292929]">Create Account</h2>
            <input
                type="text"
                placeholder="Name"
                className="mt-6 w-full max-w-md px-4 py-2 rounded-lg bg-gray-200 shadow-inner focus:shadow-lg focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Email"
                className="mt-4 w-full max-w-md px-4 py-2 rounded-lg bg-gray-200 shadow-inner focus:shadow-lg focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                className="mt-4 w-full max-w-md px-4 py-2 rounded-lg bg-gray-200 shadow-inner focus:shadow-lg focus:outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    register();
                }}
                className="mt-6 px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
                SIGN UP
            </button>
        </div>
    )
};