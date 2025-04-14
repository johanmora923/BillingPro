import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();   ////este es el contexto de notificaciones habilitadas o deshabilitadas ///This is the context of enabled or disabled notifications
export const NotificationProvider = ({ children }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(window.localStorage.getItem('notificationsEnabled'));
    
    return (
        <NotificationContext.Provider value={{ notificationsEnabled, setNotificationsEnabled }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);