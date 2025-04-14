import React, { useEffect, useState } from "react";
import {
    AiOutlineUpload,
    AiOutlineSetting,
    AiOutlineFileText,
} from "react-icons/ai";
import { FiLock, FiEdit } from "react-icons/fi";
import { toast } from "sonner";
import { useNotificationContext } from "../context/notification.jsx";

const Configuracion = () => {
    const [logo, setLogo] = useState(null);
    const [title, setTitle] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [footerMessage, setFooterMessage] = useState("");
    const [rif, setRif] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [headerData, setHeaderData] = useState({});
    const { notificationsEnabled } = useNotificationContext();

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getHeader/${user_id}`);
                const data = await response.json();
                setHeaderData(data);
                setTitle(data.titulo || "");
                setBusinessName(data.nombre_empresa || "");
                setBusinessAddress(data.direccion || "");
                setBusinessPhone(data.telefono || "");
                setFooterMessage(data.mensaje_pie || "");
                setRif(data.rif || "");
                setLogo(data.logo || null);
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };

        fetchHeaderData();
    }, []);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        setLogo(file);
    };

    const handleVerifyPassword = () => {
        setIsPasswordVerified(true);
    };

    const handleSaveSettings = () => {
        const user_id = localStorage.getItem("user_id");
        toast.promise(
            fetch(`http://localhost:3000/api/saveHeader`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    logo, title, businessName, businessAddress, businessPhone,
                    footerMessage, rif, user_id,
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al guardar configuración");
                    return res.json();
                })
                .then((data) => setHeaderData(data)),
            {
                loading: "Guardando configuración...",
                success: "¡Configuración guardada!",
                error: (err) => `Error: ${err.message}`,
            }
        );
    };

    const handleUpdateSettings = () => {
        const user_id = localStorage.getItem("user_id");
        toast.promise(
            fetch(`http://localhost:3000/api/updateHeader`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    logo, title, businessName, businessAddress, businessPhone,
                    footerMessage, rif, user_id,
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al actualizar configuración");
                    return res.json();
                })
                .then((data) => setHeaderData(data)),
            {
                loading: "Actualizando configuración...",
                success: "¡Configuración actualizada!",
                error: (err) => `Error: ${err.message}`,
            }
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen lg:ml-64">
            <div className="container mx-auto max-w-7xl bg-white shadow-xl rounded-3xl px-4 sm:px-6 lg:px-12 py-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2 uppercase tracking-wide">
                    <AiOutlineSetting className="text-blue-600 text-3xl" />
                    Configuración
                </h1>

                <div className="space-y-14">
                    {typeof logo === "string" && (
                        <div className="mt-4">
                            <img
                                src={logo}
                                alt="Logo actual"
                                className="h-20 object-contain mx-auto rounded-md shadow"
                            />
                        </div>
                    )}

                    {/* Subir Logo */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <AiOutlineUpload className="text-blue-500" />
                            Subir logo
                        </h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-800 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                        />
                        {logo && (
                            <p className="mt-2 text-sm text-green-600 font-medium break-words">
                                {logo.name} seleccionado
                            </p>
                        )}
                    </section>

                    {/* Información del Encabezado */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <AiOutlineFileText className="text-blue-500" />
                            Información del Encabezado
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[
                                { value: title, setter: setTitle, placeholder: "Título de la factura" },
                                { value: businessName, setter: setBusinessName, placeholder: "Nombre del negocio" },
                                { value: businessAddress, setter: setBusinessAddress, placeholder: "Dirección del negocio" },
                                { value: businessPhone, setter: setBusinessPhone, placeholder: "Teléfono" },
                                { value: footerMessage, setter: setFooterMessage, placeholder: "Mensaje del pie de factura" },
                                { value: rif, setter: setRif, placeholder: "RIF o identificación fiscal" },
                            ].map((field, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Botón de Guardar/Actualizar */}
                    <section className="text-center">
                        <button
                            onClick={headerData ? handleUpdateSettings : handleSaveSettings}
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                        >
                            {headerData ? "Actualizar datos" : "Guardar datos"}
                        </button>
                    </section>

                    {/* Notificaciones */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FiEdit className="text-blue-500" />
                            Notificaciones
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow">
                            <span className="text-gray-700 font-medium">
                                {notificationsEnabled === "true"
                                    ? "Notificaciones activadas"
                                    : "Notificaciones desactivadas"}
                            </span>
                            <div
                                onClick={() => {
                                    localStorage.setItem("notificationsEnabled", notificationsEnabled === "true" ? "false" : "true");
                                    toast.success(`Notificaciones ${notificationsEnabled === "true" ? "desactivadas" : "activadas"}`);
                                    window.location.reload();
                                }}
                                className={`relative w-14 h-7 flex items-center rounded-full cursor-pointer transition-all ${notificationsEnabled === "true" ? "bg-green-500" : "bg-gray-400"}`}
                            >
                                <div className={`w-7 h-7 bg-white rounded-full shadow transform transition-transform ${notificationsEnabled === "true" ? "translate-x-7" : "translate-x-0"}`} />
                            </div>
                        </div>
                    </section>

                    {/* Contraseña */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FiLock className="text-blue-500" />
                            Contraseña
                        </h2>
                        {!isPasswordVerified ? (
                            <>
                                <label className="block text-sm text-gray-600 mb-2">Contraseña actual</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Introduce tu contraseña actual"
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all"
                                />
                                <button
                                    onClick={handleVerifyPassword}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                >
                                    Verificar contraseña
                                </button>
                            </>
                        ) : (
                            <>
                                <label className="block text-sm text-gray-600 mb-2">Nueva contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nueva contraseña"
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 transition-all"
                                />
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
