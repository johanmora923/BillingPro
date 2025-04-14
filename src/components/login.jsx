import React, { useState } from "react";

const Login = () => {
    const backend = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Estado para los errores


    const login = async () => {
        const data = {
            email: formData.email,
            password: formData.password,
        };
        try {
            const res = await fetch(`${backend}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (res.ok) {
                const responseData = await res.json();
                const id_user = responseData.id;
                const nameUser = responseData.name;
                const subscription = responseData.subs;
                // Guardar en localStorage y continuar con el flujo
                window.localStorage.setItem('name_user', nameUser);
                window.localStorage.setItem('token', responseData.token);
                window.localStorage.setItem('user_id', id_user);

                setErrorMessage('');
                
                if(subscription){
                    window.location.href = "/panel"
                }
                
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || 'Login failed.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An unexpected error occurred during login.');
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200 font-montserrat text-sm text-gray-600">
            <div className="relative w-full max-w-screen-xl min-h-[600px] rounded-lg p-6 bg-gray-200 ">
                {errorMessage && (
                    <div className="absolute top-4 left-1/2 z-51 transform -translate-x-1/2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg">
                        {errorMessage}
                    </div>
                )}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-6 bg-gray-200 transition-transform duration-500 ease-in-out">
                        <h2 className="text-2xl font-bold text-[#292929]">Sign In to your account</h2>
                        <input
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-6 w-full max-w-md px-4 py-2 rounded-lg bg-gray-200 shadow-inner focus:shadow-lg focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="mt-4 w-full max-w-md px-4 py-2 rounded-lg bg-gray-200 shadow-inner focus:shadow-lg focus:outline-none"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                            className="mt-6 px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            SIGN IN
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default Login;
