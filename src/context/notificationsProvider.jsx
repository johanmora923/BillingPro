import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const NotificationContext = createContext();


// Proveedor del contexto
export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const backendUrl =  import.meta.env.VITE_BACKEND_URL;


    // Agregar una notificación y enviarla al backend
    const addNotification = async (notification) => {
        try {
            // Obtener el user_id desde localStorage
            const userId = localStorage.getItem("user_id");

            // Asegurarse de incluir el user_id en la notificación
            const notificationWithUser = { ...notification, user_id: userId };

            // Enviar la notificación al backend
            const response = await fetch(`${backendUrl}/api/notifications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notificationWithUser),
            });
            if (!response.ok) {
                throw new Error("Failed to send notification to the backend");
            }

            // Agregar la notificación al estado local después de confirmación del backend
            setNotifications((prev) => [...prev, notificationWithUser]);
        } catch (error) {
            console.error("Error adding notification:", error);
        }
    };

    // Eliminar una notificación del estado local
    const removeNotification = async (id) => {
        try{
            const response = await fetch(`${backendUrl}/deleteNotification/${id}`,{method: 'DELETE'})
            const data = await response.json()                                                                                        
            setNotifications(data.notifications)
        }
        catch(error){
            console.log(error, 'not can delete notification')
        }
    };

    // Limpiar todas las notificaciones del estado local
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification, clearNotifications, showNotifications, setShowNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

// Hook para usar el contexto
export const useNotifications = () => useContext(NotificationContext);
